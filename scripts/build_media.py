#!/usr/bin/env python3
"""Generate optimized media for the landing page.

Photos   python3 scripts/build_media.py content/images/food.jpeg [more...]
         -> <name>-1600.jpg, <name>-1600.webp, <name>-800.webp, <name>-400.webp next to the original
Video    python3 scripts/build_media.py --video "content/images/Video HERO.mp4"
         -> content/images/hero.mp4 (muted, bitrate-capped, faststart) + hero-poster.jpg
OG image python3 scripts/build_media.py --og content/images/beachub-1.jpeg
         -> content/images/og-image.jpg (1200x630)
Clip     python3 scripts/build_media.py --clip "content/images/Space/tour.MP4" 9.5 19 space-inside [--pingpong]
         -> content/images/space-inside.mp4 (540 wide, muted, faststart) + space-inside-poster.webp
         (a part of a longer video, for the cards; --pingpong plays it forward then back, so it loops
         without a jump; --clip can repeat)

Requires ffmpeg (for --video) and Pillow with WebP support.
"""
import argparse
import subprocess
from pathlib import Path

from PIL import Image, ImageOps


def run(cmd):
    print("+", " ".join(str(c) for c in cmd))
    subprocess.run(cmd, check=True)


def load(path):
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def build_photo(src):
    src = Path(src)
    stem = src.stem
    im = load(src)
    print(f"{src.name}: {im.size}")
    for width in (1600, 800, 400):
        if im.width < width:
            print(f"  skip {width}w (source is narrower)")
            continue
        resized = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        resized.save(src.with_name(f"{stem}-{width}.webp"), "WEBP", quality=80, method=6)
        if width == 1600:
            resized.save(src.with_name(f"{stem}-{width}.jpg"), "JPEG",
                         quality=82, optimize=True, progressive=True)
        print(f"  {width}w -> {resized.size}")
    # A source narrower than the largest size still gets a webp at its own width,
    # so srcset has a sharp candidate between 400w and the original
    if im.width < 1600 and im.width not in (800, 400):
        im.save(src.with_name(f"{stem}-{im.width}.webp"), "WEBP", quality=80, method=6)
        print(f"  {im.width}w (own width) -> {im.size}")


def build_video(src):
    src = Path(src)
    out_dir = src.parent
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-i", src, "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", "30",
        "-maxrate", "900k", "-bufsize", "1800k",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        out_dir / "hero.mp4",
    ])
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-ss", "2", "-i", src, "-frames:v", "1", "-q:v", "3",
        out_dir / "hero-poster.jpg",
    ])


def build_clip(src, start, end, name, pingpong=False):
    src = Path(src)
    out_dir = Path("content/images")
    out = out_dir / f"{name}.mp4"
    scale = "scale=540:-2,setsar=1"
    vf = f"{scale},split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1:a=0" if pingpong else scale
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-ss", str(start), "-to", str(end), "-i", src, "-an",
        "-filter_complex" if pingpong else "-vf", vf,
        "-c:v", "libx264", "-preset", "slow", "-crf", "30",
        "-maxrate", "1200k", "-bufsize", "2400k",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        out,
    ])
    poster = out_dir / f"{name}-poster.jpg"
    run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", out, "-frames:v", "1", "-q:v", "3", poster])
    Image.open(poster).save(out_dir / f"{name}-poster.webp", "WEBP", quality=80, method=6)
    poster.unlink()
    print(f"{out.name}: {start}s–{end}s{' (ping-pong)' if pingpong else ''} + {name}-poster.webp")


def build_og(src):
    src = Path(src)
    og = ImageOps.fit(load(src), (1200, 630), Image.LANCZOS, centering=(0.5, 0.45))
    og.save(src.with_name("og-image.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
    print(f"og-image.jpg from {src.name}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("photos", nargs="*", help="photo originals to generate variants for")
    ap.add_argument("--video", help="source video for the hero")
    ap.add_argument("--og", help="photo to crop into og-image.jpg")
    ap.add_argument("--clip", nargs=4, action="append", metavar=("SRC", "START", "END", "NAME"),
                    help="cut a part of a video into content/images/NAME.mp4 (repeatable)")
    ap.add_argument("--pingpong", action="store_true", help="clips play forward then back, for a seamless loop")
    args = ap.parse_args()

    for p in args.photos:
        build_photo(p)
    if args.video:
        build_video(args.video)
    if args.og:
        build_og(args.og)
    for src, start, end, name in args.clip or []:
        build_clip(src, start, end, name, args.pingpong)
    if not (args.photos or args.video or args.og or args.clip):
        ap.print_help()


if __name__ == "__main__":
    main()
