import { ErrorMessage } from "formik";

export default function FieldErrorMsg({ name }: { name: string }): JSX.Element {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
    </ErrorMessage>
  );
}
