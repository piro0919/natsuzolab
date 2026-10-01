"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./style.module.scss";

type FieldValues = {
  email: string;
  message: string;
  name: string;
  subject: string;
  website: string;
};

export type ContactProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

export default function Contact({ onSubmit }: ContactProps): JSX.Element {
  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
      website: "",
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.fieldsWrapper}>
            <label className={styles.label}>
              <span className={styles.label2}>
                Name<abbr>*</abbr>
              </span>
              <input
                {...register("name", { required: true })}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.label2}>
                Email<abbr>*</abbr>
              </span>
              <input
                {...register("email", { required: true })}
                className={styles.input}
                type="email"
              />
            </label>
            <label className={styles.label}>
              <span className={styles.label2}>Subject</span>
              <input {...register("subject")} className={styles.input} />
            </label>
            <label className={styles.label}>
              <span className={styles.label2}>
                Message<abbr>*</abbr>
              </span>
              <TextareaAutosize
                {...register("message", { required: true })}
                className={styles.textarea}
                minRows={4}
              />
            </label>
          </div>
          {/* ボット除けの囮。人には見えず、読み上げにも乗らない */}
          <div
            aria-hidden="true"
            style={{
              height: 1,
              left: -9999,
              overflow: "hidden",
              position: "absolute",
              width: 1,
            }}
          >
            <label>
              Website
              <input
                {...register("website")}
                autoComplete="off"
                tabIndex={-1}
              />
            </label>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} type="submit">
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
