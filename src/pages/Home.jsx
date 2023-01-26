import React, { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategodyId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { SearchContext } from "../App";

const Home = () => {
  //вытаскиваем из store.js редюсер filter, а из него уже категориайди из filterSlice
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  
  //передает категориАйДи в редукс
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    //передаем через dispatch айди кнопок категорий
    dispatch(setCategodyId(id));
  };

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
 

  React.useEffect(() => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://63bc2ed4cf99234bfa7274d3.mockapi.io/1?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, [categoryId, sortType, searchValue]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzas}</div>
    </>
  );
};

export default Home;
