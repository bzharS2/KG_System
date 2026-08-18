/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
function CreateClassFrom({ level, onSubmit, onCancel }) {
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
          {level ? `Update class` : `Create class`}
        </h2>
      </div>

      <div className="user-form__grid">
        <div className="user-form__field">
          <label>Class Name</label>
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
          {level ? `Update class` : `Create class`}
        </button>
      </div>
    </form>
  );
}

export default CreateClassFrom;
