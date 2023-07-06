import React, {
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "../Molecules/Modal";
import { AnimeDetails } from "@/types/animeList";
import Input from "../Atoms/Input";
import { Collections } from "@/types/collections";
import * as Yup from "yup";
import { json } from "stream/consumers";
import Button from "../Atoms/Button";
import { css } from "@emotion/react";
import InputSelect from "../Atoms/InputSelect";
import { SelectOption } from "@/types/reactSelect";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

interface Props {
  show: boolean;

  loading?: boolean;
  disable: boolean;
  setShow: (e: boolean) => void;
  data: AnimeDetails;
}

const ModalAddCollection: FunctionComponent<Props> = ({
  show,
  setShow,
  loading,
  data,
  disable,
}) => {
  // state
  const [collection, setCollection] = useState<Collections[]>([]);
  const [mode, setMode] = useState<string>("add-to-collection");
  const [collectionName, setCollectionName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   set collection to state
  useEffect(() => {
    setCollection(JSON.parse(localStorage.getItem("collection") as string));
    if (!collection) {
      localStorage.setItem("collection", JSON.stringify([]));
      setCollection(JSON.parse(localStorage.getItem("collection") as string));
      setMode("add-new-collection");
    } else {
      setMode("add-to-collection");
    }
    mapOption();
  }, [show]);

  //   Title
  const getTitle = useMemo(() => {
    if (mode === "add-new-collection") {
      return "Create Collection";
    } else {
      return "Select Collection";
    }
  }, [mode]);
  //   Subtitle
  const getSubtitle = useMemo(() => {
    if (mode === "add-new-collection") {
      return "You must create collection before add";
    } else {
      return "Select Collection to store your favorite anime";
    }
  }, [mode]);

  //   handle positive
  const handlePositive = async () => {};

  // Option select
  const [option, setOption] = useState<SelectOption[]>([]);
  const mapOption = () => {
    const tmp = collection?.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    setOption(tmp);
  };

  // selectvalue
  const [selectValue, setSelectValue] = useState<SelectOption[]>([]);

  // add to collection
  const addToCollection = async () => {
    let tmp: Collections[] = collection;
    const value = await selectValue?.map((item) => item.value);
    for (const name of value) {
      // tmp.name[`${item}`].datas.push(data);
      const index = await tmp.findIndex((item) => item.name === name);
      if (index != -1) {
        const index2 = await tmp[index].datas.findIndex(
          (item) => item.id === data.id
        );
        if (index2 === -1) {
          await tmp[index].datas.push(data);
        }
      }
    }

    // remove from collection
    const gg = tmp.map((item) => value.includes(item.name));
    for (let i = 0; i < gg.length; i++) {
      if (!gg[i]) {
        const index = await tmp[i].datas.findIndex(
          (item) => item.id === data.id
        );
        if (index != -1) {
          tmp[i].datas.splice(index, 1);
        }
      }
    }

    setCollection(tmp);
    localStorage.setItem("collection", JSON.stringify(collection));
    setCollectionName("");
    setShow(false);
    setErrorMessage("");
    toast.success(`Success save data`);
  };

  useEffect(() => {
    setSelectedValue();
  }, [show]);

  const setSelectedValue = () => {
    let alreadyAdded = [];
    for (const item of collection) {
      const index = item.datas.findIndex((value) => value.id === data.id);
      if (index != -1) {
        alreadyAdded.push({
          label: item.name,
          value: item.name,
        });
      }
    }

    setSelectValue(alreadyAdded);
  };

  // Add collection
  const handleAddCollection = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validator.validate({ name: collectionName });
      let tmp: Collections[] = collection;

      const index = tmp.findIndex((item) => item.name === collectionName);
      if (index === -1) {
        const value: Collections = {
          name: collectionName,
          id: nanoid(),
          datas: [],
        };
        tmp.push(value);

        setCollection(tmp);
        mapOption();
        await localStorage.setItem("collection", JSON.stringify(collection));
      } else {
        throw new Error("Collection Name alredy taken");
      }
      toast.success("Success add new collection");
      setCollectionName("");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // validator
  const validator = Yup.object({
    name: Yup.string()
      .required("Collection Name is required")
      .matches(/^[a-zA-Z0-9_\s]*$/, "Collection Name cant accept special char"),
  });

  return (
    <Modal
      show={show}
      title={getTitle}
      subtitle={getSubtitle}
      actionNegative={() => setShow(false)}
      actionPositive={() => addToCollection()}
      loading={loading}
      disable={false}
    >
      <form
        css={css`
          width: 100%;
        `}
        onSubmit={handleAddCollection}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
          `}
        >
          <Input
            id="collection-input"
            label="Add new collection"
            placeholder="Add name of collection"
            errorMessage={errorMessage}
            value={collectionName}
            onChange={(e) => setCollectionName(e)}
          />
          <Button block={false} disabled={disable} size="small" type="submit">
            Add
          </Button>
        </div>
      </form>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        `}
      >
        <InputSelect
          id="select"
          option={option}
          onChange={(e) => setSelectValue(e as SelectOption[])}
          value={selectValue}
          label="Select Collection"
        />
      </div>
    </Modal>
  );
};

export default ModalAddCollection;
