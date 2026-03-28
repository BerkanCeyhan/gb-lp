"""
Generates 12 flavor images for Geschmacksbombe using Nano Banana 2
(gemini-3.1-flash-image-preview) and saves them to public/flavors/.

Usage:
    GEMINI_API_KEY=your_key python3 infos/generate_flavors.py
"""

import io
import os
import sys
import time
from pathlib import Path
from google import genai
from google.genai import types
from PIL import Image

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: Set GEMINI_API_KEY environment variable first.")
    print("  export GEMINI_API_KEY=your_key_here")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "flavors"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

FLAVORS = [
    {
        "filename": "blaubeer-kaesekuchen.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is rich cheesecake-cream white with deep blueberry purple ripples swirled throughout, scattered whole blueberries sinking into the cream, and golden graham cracker crumbs sprinkled across the surface. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is cream white, deep violet-blue, warm golden brown. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "apfel-zimt.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is warm cinnamon beige with visible cinnamon powder dusting, tiny caramelized apple chunks, delicate swirls of amber caramel sauce, and a hint of cinnamon stick shavings. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm beige, golden amber, rustic cinnamon brown, soft apple green accents. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "bananensplit.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is banana-yellow with streaks of dark chocolate sauce, pieces of real banana slices, crushed waffle cone pieces, and dollops of whipped cream texture folded into the swirl. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm golden yellow, rich dark brown chocolate, cream white. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "butterkeks.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is warm butter-golden cream with crushed shortbread cookie pieces scattered throughout, golden-brown biscuit crumbs, tiny chunks of butter cookie, and a subtle caramel-butter glaze rippled through the cream. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm butter yellow, golden biscuit brown, soft vanilla cream. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "erdbeer-wunder.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is vibrant strawberry pink with streaks of deeper strawberry red sauce, fresh strawberry slices and halves partially submerged, tiny strawberry seeds visible in the sauce ripples, and swirls of white cream creating a marbled effect. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is bright strawberry pink, deep berry red, pure cream white. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "erdnuss-karamell.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is rich peanut-butter tan with thick golden caramel sauce ribbons swirled through, crushed roasted peanut pieces scattered across the surface, and a glossy caramel glaze pooling in the swirl grooves. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm peanut tan, deep golden caramel, roasted brown, honey amber. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "haselnuss.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is warm hazelnut brown with a subtle Nutella-like chocolate-hazelnut marbling, crushed roasted hazelnut pieces and whole halved hazelnuts scattered on top, and a fine dusting of cocoa powder across the surface. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm hazelnut brown, rich chocolate brown, toasted golden, cream undertones. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "himbeere.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is deep raspberry magenta-pink with whole fresh raspberries pressed into the surface, raspberry seed texture visible in the darker sauce ripples, and lighter pink-white cream swirls creating a bold contrast. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is deep raspberry magenta, bright berry pink, cream white, dark berry red. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "kirsch-wunder.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is deep cherry red with luxurious dark cherry sauce ribbons, halved fresh cherries with visible glossy flesh scattered throughout, and vanilla-white cream swirls creating dramatic contrast against the deep red. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is deep cherry red, dark burgundy, cream white, hints of cherry stem green. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "schoko-kiddy.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is rich milk chocolate brown with colorful tiny candy sprinkles scattered playfully across the surface, small chocolate crisp ball pieces, a drizzle of white chocolate sauce, and swirls of darker cocoa creating depth. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm milk chocolate brown, pops of colorful sprinkles (red, yellow, blue, green), ivory white chocolate, dark cocoa. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "tiramisu.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is mascarpone cream white with elegant cocoa powder dusted across the top in swirl patterns, espresso-brown coffee sauce ribbons, tiny ladyfinger biscuit crumbs, and a fine chocolate shaving garnish. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is mascarpone cream white, espresso dark brown, cocoa dust brown, warm biscuit tan. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
    {
        "filename": "vanille.png",
        "prompt": "Overhead food photography of a creamy swirl texture filling the entire square frame. The swirl is classic vanilla cream ivory with visible black vanilla bean specks throughout, a subtle golden-yellow warmth to the cream, and delicate caramel-vanilla sauce wisps creating gentle contrast in the folds. Shot from directly above, soft diffused studio lighting, shallow depth of field on the edges. The texture is thick, creamy, and glossy like premium frozen yogurt or whipped quark. Background is the swirl itself — no plate, no bowl, no spoon, no table. Color palette is warm ivory cream, soft vanilla yellow, black vanilla bean specks, hint of golden caramel. Ultra-realistic food photography, 1:1 aspect ratio.",
    },
]

def generate_image(flavor: dict) -> bool:
    out_path = OUTPUT_DIR / flavor["filename"]
    if out_path.exists():
        print(f"  ⏭  Already exists, skipping: {flavor['filename']}")
        return True

    print(f"  ⏳ Generating: {flavor['filename']} ...")
    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-image-preview",
            contents=[flavor["prompt"]],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )
        for part in response.parts:
            if part.inline_data is not None:
                image = Image.open(io.BytesIO(part.inline_data.data))
                if image.size != (1024, 1024):
                    image = image.resize((1024, 1024), Image.LANCZOS)
                image.save(out_path, "PNG")
                print(f"  ✅ Saved: {out_path}")
                return True
        print(f"  ⚠️  No image in response for {flavor['filename']}")
        return False
    except Exception as e:
        print(f"  ❌ Error for {flavor['filename']}: {e}")
        return False

def main():
    print(f"\n🍦 Generating {len(FLAVORS)} flavor images → {OUTPUT_DIR}\n")
    success, failed = 0, []
    for i, flavor in enumerate(FLAVORS, 1):
        print(f"[{i}/{len(FLAVORS)}]", end=" ")
        ok = generate_image(flavor)
        if ok:
            success += 1
        else:
            failed.append(flavor["filename"])
        if i < len(FLAVORS):
            time.sleep(1)  # avoid rate limits

    print(f"\n✅ Done: {success}/{len(FLAVORS)} generated")
    if failed:
        print(f"❌ Failed: {', '.join(failed)}")

if __name__ == "__main__":
    main()
