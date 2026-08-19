/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

// level means class onSubmit means when clicked it will perform a function onCancel is to not show the form by making it false and subjects is boolean used to determine if the form is used for subjects or class
function CreateClassFrom({ level, onSubmit, onCancel, subjects }) {
  const [name, setName] = useState("");

  // If user exists, we're editing
  useEffect(() => {
    if (level) {
      setName(level.name || "");
    } else {
      setName("");
    }
  }, [level]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      id: level?.id,
      name,
    };

    await onSubmit(formData);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form__header">
        <span className="user-form__tag">{level ? "EDIT" : "NEW"}</span>
        <h2 className="user-form__title">
          {level
            ? `Update ${subjects ? `subjects` : `class`}`
            : `Create ${subjects ? `subjects` : `class`}`}
        </h2>
      </div>

      <div className="user-form__grid">
        <div className="user-form__field">
          <label>{subjects ? `subjects` : `class`} Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="user-form__actions">
        <button
          type="button"
          className="user-form__btn user-form__btn--ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="user-form__btn user-form__btn--primary"
        >
          {level
            ? `Update ${subjects ? `subjects` : `class`}`
            : `Create ${subjects ? `subjects` : `class`}`}
        </button>
      </div>
    </form>
  );
}

export default CreateClassFrom;
