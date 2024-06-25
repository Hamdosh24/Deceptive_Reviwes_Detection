from torch.nn import BCEWithLogitsLoss


def loss_fn(output, target):
    return BCEWithLogitsLoss()(output, target)