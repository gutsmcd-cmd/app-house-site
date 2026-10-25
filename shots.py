import json,asyncio
from playwright.async_api import async_playwright
apps=[a for a in json.load(open('public/apps.json'))['apps'] if a['url'] and 'github.io' in a['url']]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    ctx=await b.new_context(viewport={'width':390,'height':760},device_scale_factor=1)
    sem=asyncio.Semaphore(6)
    async def one(a):
      async with sem:
        pg=await ctx.new_page()
        try:
          r=await pg.goto(a['url'],timeout=25000,wait_until='load'); await pg.wait_for_timeout(1500)
          await pg.screenshot(path=f"public/shots/{a['id']}.jpg",type='jpeg',quality=55)
          print('ok',a['id'],r.status)
        except Exception as e: print('ERR',a['id'],str(e)[:80])
        await pg.close()
    await asyncio.gather(*[one(a) for a in apps])
    await b.close()
asyncio.run(main())
