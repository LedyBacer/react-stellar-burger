import React, {useEffect, useMemo} from "react";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import {ingredientsPropType} from "../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, setIsOpen, setModalHeader, setModalType} from "../../services/detailsSlice";
import {useDrag} from "react-dnd";

function Ingredients({item, handleClick, type}) {
    const bunId = useSelector(state => state.constructorCart.bunId);
    const cart = useSelector(state => state.constructorCart.ingredientsId);

    const count = useMemo(() => cart.filter(e => e.ingredientId === item._id).length, [cart]);
    const isItemInCart = useMemo(() => cart.some(e => e.ingredientId === item._id), [cart]);

    const [, drag] = useDrag({
        type: type,
        item: {id: item._id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div ref={drag} className={styles.ingridient} onClick={handleClick} data-id={item._id}>
            {isItemInCart && <Counter count={count} size="default" extraClass="m-1" />}
            {bunId === item._id && <Counter count={1} size="default" extraClass="m-1" />}
            <img alt={item.name} src={item.image} className={`${styles.ingridient_image} ml-4`} data-id={item._id}/>
            <div className={`${styles.price} mt-1`} data-id={item._id}>
                <p className="text text_type_digits-default" data-id={item._id}>{item.price}</p>
                <CurrencyIcon type="primary" data-id={item._id}/>
            </div>
            <p className="text text_type_main-default mt-1" data-id={item._id}>{item.name}</p>
        </div>
    );
}

function BurgerIngredients() {
    const dispatch = useDispatch();
    const burgersData = useSelector(state => state.ingredients.burgersData);

    const [currentTab, setCurrentTab] = React.useState('buns');
    const [scroll, scrollTo] = React.useState('');

    const refBun = React.useRef(null);
    const refSauce = React.useRef(null);
    const refFillers = React.useRef(null);
    const scrollRef = React.useRef(null);

    const bunsData = React.useMemo(() => burgersData.filter(item => item.type.includes('bun')), [burgersData]);
    const saucesData = React.useMemo(() => burgersData.filter(item => item.type.includes('sauce')), [burgersData]);
    const fillersData = React.useMemo(() => burgersData.filter(item => item.type.includes('main')), [burgersData]);

    const openModal = e => {
        const selectedProductId = e.target.getAttribute("data-id");
        const [ tempIngData ] = burgersData.filter(item => item._id.includes(selectedProductId))
        dispatch(addIngredient(tempIngData));
        dispatch(setModalType(''));
        dispatch(setModalHeader('Детали ингредиента'));
        dispatch(setIsOpen(true));
    }

    useEffect(() => {
        const currents = [refBun.current, refSauce.current, refFillers.current];
        const watcher = new IntersectionObserver(
            (currents) => {
                currents.forEach((e) => {
                    if (e.target === refBun.current) {
                        setCurrentTab("buns");
                    }
                    if (e.target === refSauce.current) {
                        setCurrentTab("sauces");
                    }
                    if (e.target === refFillers.current) {
                        setCurrentTab("fillers");
                    }
                });
            },
            {
                root: scrollRef.current,
                rootMargin: "0px 0px -70% 0px",
            }
        );
        currents.forEach((e) => {
            return watcher.observe(e);
        });
    }, []);

    useEffect(() => {
        if (scroll === "buns") {
            refBun.current.scrollIntoView({ behavior: "smooth" });
        }
        if (scroll === "sauces") {
            refSauce.current.scrollIntoView({ behavior: "smooth" });
        }
        if (scroll === "fillers") {
            refFillers.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [scroll]);

    return (
        <section className={styles.container}>
            <p className="text text_type_main-large mt-10">Соберите бургер</p>
            <div className={`${styles.flex} mt-5`}>
                <Tab value="buns" active={currentTab === 'buns'} onClick={scrollTo}>Булки</Tab>
                <Tab value="sauces" active={currentTab === 'sauces'} onClick={scrollTo}>Соусы</Tab>
                <Tab value="fillers" active={currentTab === 'fillers'} onClick={scrollTo}>Начинки</Tab>
            </div>
            <div className={styles.ingredient_container} ref={scrollRef}>
                <p className="text text_type_main-medium mt-10" ref={refBun}>Булки</p>
                <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                    {bunsData.map(item => <Ingredients item={item} handleClick={openModal} key={item._id} type={'bun'}/>)}
                </section>
                <p className="text text_type_main-medium mt-10" ref={refSauce}>Соусы</p>
                <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                    {saucesData.map(item => <Ingredients item={item} handleClick={openModal} key={item._id} type={'sauce'}/>)}
                </section>
                <p className="text text_type_main-medium mt-10" ref={refFillers}>Начинки</p>
                <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                    {fillersData.map(item => <Ingredients item={item} handleClick={openModal} key={item._id} type={'fillers'}/>)}
                </section>
            </div>
        </section>
    );
}

Ingredients.propTypes = { ...ingredientsPropType }

export default BurgerIngredients