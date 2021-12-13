import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      page: 1,
    };
  }

  /**
   * Установить страницу
   */
  set(page) {
    this.setState({
      page: page,
    });
  }

  /**
   * Загрузка списка товаров
   */
  async load(page) {
    const skip = (page - 1) * 10;
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      page,
    });
  }
}

export default CatalogStore;
