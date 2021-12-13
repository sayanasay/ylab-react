import StoreModule from "../module";

class ItemStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: null,
      error: null,
    };
  }

  /**
   * Загрузка товара
   */
  async load(slug) {
    this.setState({ item: null, error: null });
    try {
      const response = await fetch(
        `/api/v1/articles/${slug}?fields=*,maidIn(title,code),category(title)`
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const json = await response.json();
      this.setState({ item: json.result, error: null });
    } catch (error) {
      this.setState({ item: null, error: error.message });
      console.log(error);
    }
  }
}

export default ItemStore;
