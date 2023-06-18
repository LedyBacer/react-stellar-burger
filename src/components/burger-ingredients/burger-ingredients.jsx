import React from "react";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'

function ItemCounter(props) {

    return (
        <Counter count={1} size="default" extraClass="m-1" />
    );
}

class Buns extends React.Component {
    constructor(props) {
        super(props);
    }

    // count = (e) => {
    //     this.setState(prevState => {
    //         const id = e.target.dataset.id;
    //
    //         if (prevState[id] === true) {
    //             prevState[id] = false
    //             return {
    //                 ...prevState,
    //                 ...prevState[id]
    //             }
    //         } else if (prevState[id] === false || prevState[id] === null ) {
    //             prevState[id] = true
    //             return {
    //                 ...prevState,
    //                 ...prevState[id]
    //             }
    //         }
    //
    //     })
    // }

    render() {
        return (
            <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                {this.props.bunsData.map(bun => {
                    return (
                        <div className={styles.ingridient} key={bun._id} onClick={this.count} data-id={bun._id}>
                            {/*{this.props.status && (*/}
                            {/*    <p className={`user__status ${this.props.status}`}>{renderStatus[this.props.status]}</p>*/}
                            {/*)}*/}
                            <ItemCounter/>
                            <img src={bun.image} className={`${styles.ingridient_image} ml-4`} data-id={bun._id}/>
                            <div className={`${styles.price} mt-1`} data-id={bun._id}>
                                <p className="text text_type_digits-default" data-id={bun._id}>{bun.price}</p>
                                <CurrencyIcon type="primary" data-id={bun._id}/>
                            </div>
                            <p className="text text_type_main-default mt-1" data-id={bun._id}>{bun.name}</p>
                            {/* Картинка булки + иконка выбора булки */}
                            {/* Цена + иконка цены */}
                            {/* Описание булки */}
                        </div>
                    )
                })}
            </section>
        );
    }
}

class Sauces extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                {this.props.saucesData.map(sauce => {
                    return (
                        <div className={styles.ingridient} key={sauce._id}>
                            <img src={sauce.image} className={`${styles.ingridient_image} ml-4`}/>
                            <div className={`${styles.price} mt-1`}>
                                <p className="text text_type_digits-default">{sauce.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className="text text_type_main-default mt-1">{sauce.name}</p>
                            {/* Картинка булки + иконка выбора булки */}
                            {/* Цена + иконка цены */}
                            {/* Описание булки */}
                        </div>
                    )
                })}
            </section>
        );
    }
}

class Fillers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`${styles.ingridients} mt-6 ml-4 mr-4`}>
                {this.props.fillersData.map(filler => {
                    return (
                        <div className={styles.ingridient} key={filler._id}>
                            <img src={filler.image} className={`${styles.ingridient_image} ml-4`}/>
                            <div className={`${styles.price} mt-1`}>
                                <p className="text text_type_digits-default">{filler.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className="text text_type_main-default mt-1">{filler.name}</p>
                            {/* Картинка булки + иконка выбора булки */}
                            {/* Цена + иконка цены */}
                            {/* Описание булки */}
                        </div>
                    )
                })}
            </section>
        );
    }
}


function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('buns');
    const bunsData = props.burgersData.filter(item => 'bun'.indexOf(item.type) !== -1);
    const saucesData = props.burgersData.filter(item => 'sauce'.indexOf(item.type) !== -1);
    const fillersData = props.burgersData.filter(item => 'main'.indexOf(item.type) !== -1);

    return (
        <section className={styles.container}>
            <p className="text text_type_main-large mt-10">Соберите бургер</p>
            <div style={{ display: 'flex' }} className="mt-5">
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="fillers" active={current === 'fillers'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <p className="text text_type_main-medium mt-10">Булки</p>
            <Buns bunsData={bunsData}/>
            <p className="text text_type_main-medium mt-10">Соусы</p>
            <Sauces saucesData={saucesData}/>
            <p className="text text_type_main-medium mt-10">Начинки</p>
            <Fillers fillersData={fillersData}/>
        </section>
    );
}

export default BurgerIngredients