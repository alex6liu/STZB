<template>
  <div class="main">
    <draggable tag="ul" v-model="playerList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="player-list">
      <transition-group>
          <div v-for="(element, id) in playerList" :key="id" class="inner-container">
            {{element.name}}
          </div>
      </transition-group>
    </draggable>

    <draggable tag="ul" v-model="skillList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="skill-list">
      <transition-group>
          <div v-for="(element, id) in skillList" :key="id" class="inner-container">
            {{element.name}}
          </div>
      </transition-group>
    </draggable>

    <div class="my-list">
      <draggable tag="ul" v-model="list1" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
        <transition-group>
            <div v-for="(element, id) in list1" :key="id" class="inner-container">
              {{element.name}}
            </div>
        </transition-group>
      </draggable>
      <draggable tag="ul" v-model="list2" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
        <transition-group>
            <div v-for="(element, id) in list2" :key="id" class="inner-container">
              {{element.name}}
            </div>
        </transition-group>
      </draggable>

      <draggable tag="ul" v-model="list3" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
        <transition-group>
            <div v-for="(element, id) in list3" :key="id" class="inner-container">
              {{element.name}}
            </div>
        </transition-group>
      </draggable>

      <draggable tag="ul" v-model="list4" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
        <transition-group>
            <div v-for="(element, id) in list4" :key="id" class="inner-container">
              {{element.name}}
            </div>
        </transition-group>
      </draggable>

      <draggable tag="ul" v-model="list5" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
        <transition-group>
            <div v-for="(element, id) in list5" :key="id" class="inner-container">
              {{element.name}}
            </div>
        </transition-group>
      </draggable>

    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      list1: [
        {
          name: '队伍1',
          fixed: false,
        },
      ],
      list2: [
        {
          name: '队伍2',
          fixed: false,
        },
      ],
      list3: [
        {
          name: '队伍3',
          fixed: false,
        },
      ],
      list4: [
        {
          name: '队伍4',
          fixed: false,
        },
      ],
      list5: [
        {
          name: '队伍5',
          fixed: false,
        },
      ],
      list6: [
        {
          name: '队伍6',
          fixed: false,
        },
      ],
      list7: [
        {
          name: '队伍7',
          fixed: false,
        },
      ],
      list8: [
        {
          name: '队伍8',
          fixed: false,
        },
      ],
      playerList: [
        {
          name: '刘备',
          fixed: false,
        },
        {
          name: '吕蒙',
          fixed: false,
        },
        {
          name: '孙权',
          fixed: false,
        },
      ],
      skillList: [
        {
          name: '大赏三军',
          fixed: false,
        },
        {
          name: '神兵天降',
          fixed: false,
        },
        {
          name: '混水摸鱼',
          fixed: false,
        },
        {
          name: '大赏三军',
          fixed: false,
        },
        {
          name: '神兵天降',
          fixed: false,
        },
        {
          name: '混水摸鱼',
          fixed: false,
        },
      ],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
};

</script>
<style lang="less">
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.player-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  margin: 10rpx;
  padding: 10px;
  font-size: 18px;
}

.skill-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  font-size: 15px;
}

.inner-container {
  border: 1px solid #000;
}

.inner-container + .inner-container {
  margin-top: 10px;
}

.my-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.test {
  display: flex;
  flex-direction: column;
  min-height: 80px;
  min-width: 80px;
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}

</style>
