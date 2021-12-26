import StoreModule from "../module";

class FormInfoStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: true,
      countries: [],
    };
  }

  /**
   * Загрузка списка категорий
   */
  async loadCategories() {
    this.updateState({
      ...this.getState(),
      waiting: true,
      categories: [],
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        ...this.getState(),
        categories: json.result.items,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        ...this.getState(),
        categories: [],
        waiting: false,
      });
    }
  }

  /**
   * Загрузка списка стран
   */
  async loadCountries() {
    this.updateState({
      ...this.getState(),
      waiting: true,
      countries: [],
    });

    try {
      const response = await fetch(`/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        ...this.getState(),
        countries: json.result.items,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        ...this.getState(),
        countries: [],
        waiting: false,
      });
    }
  }
}

export default FormInfoStore;
