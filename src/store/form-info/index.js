import StoreModule from "../module";

class FormInfoStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: 0,
      countries: [],
    };
  }

  /**
   * Загрузка списка категорий
   */
  async loadCategories() {
    this.updateState({
      waiting: this.getState().waiting + 1,
      categories: [],
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        categories: json.result.items.map((el) => ({ value: el._id, ...el })),
        waiting: this.getState().waiting - 1,
      });
    } catch (e) {
      this.updateState({
        categories: [],
        waiting: this.getState().waiting - 1,
      });
    }
  }

  /**
   * Загрузка списка стран
   */
  async loadCountries() {
    this.updateState({
      waiting: this.getState().waiting + 1,
      countries: [],
    });

    try {
      const response = await fetch(`/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        countries: json.result.items.map((el) => ({ value: el._id, ...el })),
        waiting: this.getState().waiting - 1,
      });
    } catch (e) {
      this.updateState({
        countries: [],
        waiting: this.getState().waiting - 1,
      });
    }
  }
}

export default FormInfoStore;
