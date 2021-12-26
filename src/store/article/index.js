import StoreModule from "../module";
import makeErrorText from "../../utils/make-error-text";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {
        _id: "",
        title: "",
        description: "",
        maidIn: "",
        category: "",
        edition: "",
        price: "",
      },
      waiting: false,
      error: {},
    };
  }

  /**
   * Загрузка товара
   */
  async load(id) {
    this.updateState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        ...this.getState(),
        data: json.result,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        ...this.getState(),
        data: {},
        waiting: false,
      });
    }
  }

  async edit(article) {
    this.updateState({
      ...this.getState(),
      error: {},
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/articles/${article._id}`, {
        method: "PUT",
        body: JSON.stringify(article),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.error) {
        const errorText = makeErrorText(json.error);
        this.updateState({
          ...this.getState(),
          error: `Error: ${json.error.message}: ${errorText}`,
        });
        throw new Error(json.error);
      }
      this.updateState({
        error: {},
        data: json.result,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  async delete(id) {
    this.updateState({
      ...this.getState(),
      waiting: true,
      error: {},
    });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=_id&lang=ru`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (json.error) {
        this.updateState({
          ...this.getState(),
          error: makeErrorText(json.error),
        });
        throw new Error(json.error);
      }
      this.updateState({
        data: {},
        waiting: false,
        error: {},
      });
      return json.result;
    } catch (e) {
      this.updateState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  async create(article) {
    this.updateState({
      ...this.getState(),
      error: {},
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/articles?lang=ru&fields=`, {
        method: "POST",
        body: JSON.stringify(article),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.error) {
        this.updateState({
          ...this.getState(),
          error: makeErrorText(json.error),
        });
        throw new Error(json.error);
      }
      this.updateState({
        error: {},
        data: json.result,
        waiting: false,
      });
      return json.result;
    } catch (e) {
      this.updateState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default ArticleStore;
