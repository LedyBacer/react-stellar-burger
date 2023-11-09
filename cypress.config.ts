import { defineConfig } from "cypress";
import {BASE_URL} from "./src/utils/api";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
  env: {
    bun: 'Краторная булка N-200i',
    bun_up: 'Краторная булка N-200i (верх)',
    ingredient1: 'Соус Spicy-X',
    ingredient1_data: '[data-handler-id^=T17]',
    ingredient2: 'Соус фирменный Space Sauce',
    ingredient2_data: '[data-handler-id^=T19]',
    dnd_drop: 'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа',
    order_btn: 'Оформить заказ',
    email: 'minecraft.klub@yandenx.ru',
    pass: 'testtest',

    api_BASE_URL: BASE_URL,
    api_order: BASE_URL + '/orders'
  }
});
