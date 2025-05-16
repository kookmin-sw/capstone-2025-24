import os, json, shutil, random, subprocess, argparse, yaml, math
from pathlib import Path
from collections import defaultdict

FFMPEG = "ffmpeg"        
CLIP_SEC = 5.0
WINDOW   = 2.5           

# 클립화해 저장
def extract_clip(src, dst, center, clip_sec=CLIP_SEC):
    start = max(0.0, center - WINDOW)
    cmd = [
        FFMPEG, "-y",
        "-ss", f"{start:.3f}",
        "-i", src,
        "-t", f"{clip_sec:.3f}",
        "-c", "copy",  
        dst
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# 데이터 나누기
def split_dataset(samples, ratios=(0.7,0.15,0.15)):
    by_label = defaultdict(list)
    for s in samples: by_label[s["label"]].append(s)

    train, val, test = [], [], []
    for lbl, items in by_label.items():
        random.shuffle(items)
        n = len(items)
        n_train = math.ceil(n*ratios[0])
        n_val   = math.ceil(n*ratios[1])
        train += items[:n_train]
        val   += items[n_train:n_train+n_val]
        test  += items[n_train+n_val:]
    return train, val, test

def copy_to_split(split_name, records, root):
    for rec in records:
        tgt_dir = Path(root)/split_name/rec["label"]
        tgt_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(rec["clip_path"], tgt_dir)

def main(args):
    random.seed(42)

    feedback = json.load(open(args.feedback))
    tmp_clips_dir = Path("tmp_clips")
    tmp_clips_dir.mkdir(exist_ok=True)

    processed = []
    for i, ev in enumerate(feedback):
        src  = ev["video"]
        label= ev["label"]
        t    = float(ev["time"])
        out  = tmp_clips_dir/f"{Path(src).stem}_{i:04d}.mp4"
        extract_clip(src, out, t)
        processed.append({"label":label, "clip_path":str(out)})

    train,val,test = split_dataset(processed)

    for split_name, recs in zip(("train","val","test"), (train,val,test)):
        copy_to_split(split_name, recs, args.dataset_root)

    cfg_path = args.cfg
    cfg = yaml.safe_load(open(cfg_path))
    cfg["data_path"]   = str(Path(args.dataset_root).resolve())
    cfg["num_classes"] = len({ r["label"] for r in processed })
    yaml.safe_dump(cfg, open(cfg_path, "w"))

    print(f"데이터 정리 완료 → {cfg['data_path']}")
    print(f"클래스 수: {cfg['num_classes']}, 샘플: {len(processed)}")
    print("X3D 파인튜닝 시작 …")
    subprocess.run(["python", "train.py"], check=True)

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--feedback",      required=True, help="mis-detection JSON")
    p.add_argument("--dataset_root",  default="retrain_dataset")
    p.add_argument("--cfg",           default="configs/default.yaml")
    args = p.parse_args()
    main(args)
