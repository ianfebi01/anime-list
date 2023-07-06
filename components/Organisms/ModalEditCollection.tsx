import React, {
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Modal from "../Molecules/Modal";
import Input from "../Atoms/Input";
import { Collections } from "@/types/collections";
import * as Yup from "yup";
import Button from "../Atoms/Button";
import { css } from "@emotion/react";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

interface Props {
  show: boolean;
  loading?: boolean;
  disable: boolean;
  setShow: (e: boolean) => void;
  data: Collections;
  setData: (values: Collections) => void;
}

const ModalEditCollection: FunctionComponent<Props> = ({
  show,
  setShow,
  loading,
  disable,
  data,
  setData,
}) => {
  // state
  const [collection, setCollection] = useState<Collections[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   set collection to state
  useEffect(() => {
    setCollection(JSON.parse(localStorage.getItem("collection") as string));
    if (!collection) {
      localStorage.setItem("collection", JSON.stringify([]));
      setCollection(JSON.parse(localStorage.getItem("collection") as string));
    }
    setCollectionName(data?.name);
  }, [show]);

  // Add collection
  const handleAddCollection = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validator.validate({ name: collectionName });
      let tmp: Collections[] = collection;

      const index = tmp?.findIndex((item) => item.id === data?.id);
      if (index != -1) {
        const indexName = tmp.findIndex((item) => item.name === collectionName);
        if (indexName === -1) {
          tmp[index].name = collectionName;
          await setCollection(tmp);
          await localStorage.setItem("collection", JSON.stringify(collection));
          setData(tmp[index]);
        } else {
          throw new Error("Collection Name alredy taken");
        }
      }
      toast.success("Success edit collection");
      setCollectionName("");
      setErrorMessage("");
      setShow(false);
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

  // ref
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = () => {
    buttonRef.current?.click();
  };

  return (
    <Modal
      show={show}
      title="Edit Collection"
      subtitle="Edit collection to store your fav anime"
      actionNegative={() => setShow(false)}
      actionPositive={() => handleSubmit()}
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
          {collectionName != undefined && (
            <Input
              id="collection-input"
              placeholder="Add name of collection"
              errorMessage={errorMessage}
              value={collectionName}
              onChange={(e) => setCollectionName(e)}
            />
          )}
        </div>
        <button
          type="submit"
          css={css`
            display: none;
          `}
          ref={buttonRef}
        ></button>
      </form>
    </Modal>
  );
};

export default ModalEditCollection;
