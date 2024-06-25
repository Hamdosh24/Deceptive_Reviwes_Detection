import pandas as pd
from sklearn.model_selection import train_test_split
from baseline_model.functions.prepare import *
from torch.utils.data import DataLoader
from baseline_model.functions.afrd_dataset import AFRD


def pipeline(model, optimizer, train_fn, test_fn, exe_seq):
    curr_stage = ''
    total_test = pd.DataFrame(columns=['Text', 'Fake', 'Truthful'])
    for i in exe_seq:
        # import the data set
        data = pd.read_excel(data_paths[i])
        data.drop(labels=['Age', 'Gender', 'Platform/Name', 'Product', 'Rating', 'Polarity'], axis=1, inplace=True)

        # encoding
        enc_y_data = pd.get_dummies(data['Class'], dtype=float)
        data[target_list] = enc_y_data[target_list]
        data.drop(labels=['Class'], axis=1, inplace=True)

        # splitting the data into train, valid, test
        train_data, test_data = train_test_split(data, test_size=0.25, random_state=32, shuffle=True)
        train_data, valid_data = train_test_split(train_data, test_size=0.2, random_state=32, shuffle=True, )

        train_data.reset_index(drop=True, inplace=True)
        valid_data.reset_index(drop=True, inplace=True)
        test_data.reset_index(drop=True, inplace=True)

        train_data = AFRD(train_data, b_tokenizer, MAX_LEN)
        valid_data = AFRD(valid_data, b_tokenizer, MAX_LEN)

        train_data_loader = DataLoader(
            train_data,
            shuffle=True,
            batch_size=TRAIN_BATCH_SIZE,
            num_workers=0
        )

        val_data_loader = DataLoader(
            valid_data,
            shuffle=False,
            batch_size=VALID_BATCH_SIZE,
            num_workers=0
        )
        del train_data, valid_data

        curr_stage = curr_stage + f"{i}"
        print(f'############################-{curr_stage}model-################################')
        # Training
        train_fn(EPOCHS, train_data_loader, val_data_loader, model, optimizer,
                 f"E:/Pycharm_Projects/baseline_model/interface/check_points/{curr_stage}_curr_ck.pt",
                 f"E:/Pycharm_Projects/baseline_model/interface/check_points/{curr_stage}_best.pt")
        # Testing
        test_fn(model, test_data)

        del train_data_loader, val_data_loader
        total_test = pd.concat([total_test, test_data], ignore_index=True)
        del test_data

    print('###############################-Final Test-#######################################')
    test_fn(model, total_test)
