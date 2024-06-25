from torch import load, save
from shutil import copyfile


def load_ckp(checkpoint_fpath, model, optimizer):
    checkpoint = load(checkpoint_fpath)
    model.load_state_dict(checkpoint['state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer'])

    return model, optimizer, checkpoint['epoch']


def save_ckp(state, is_best, checkpoint_path, best_model_path):
    f_path = checkpoint_path
    save(state, f_path)
    if is_best:
        best_fpath = best_model_path
        copyfile(f_path, best_fpath)
