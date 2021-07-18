import React from "react";
import Toast from "components/elements/Toast";
import toast from "react-hot-toast";

interface Props {
  title: string;
  message: string;
  icon?: JSX.Element;
}

const notify = (props: Props) =>
  toast.custom((t) => (
    <Toast
      title={props.title}
      message={props.message}
      icon={props.icon}
      id={t.id}
      show={t.visible}
    />
  ));

export { notify };
