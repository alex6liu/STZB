import Goods from './pages/menu/Goods.vue';
import MyLineup from './pages/menu/MyLineup.vue';
import MyCard from './pages/menu/MyCard.vue';
import WholeCard from './pages/menu/WholeCard.vue';

const menu = [
  {
    icon: 'cube',
    title: '物品管理',
    path: '/goods',
    component: Goods,
  },
  {
    icon: 'clipboard',
    title: '我的阵容',
    path: '/my-lineup',
    component: MyLineup,
  },
  {
    icon: 'checkmark',
    title: '我的卡牌',
    path: '/my-card',
    component: MyCard,
  },
  {
    icon: 'card',
    title: '全部卡牌',
    path: '/whole-card',
    component: WholeCard,
  },
];
export default menu;
