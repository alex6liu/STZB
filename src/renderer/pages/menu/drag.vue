<template>
  <div class="main">
    <draggable tag="ul" v-model="playerList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="player-list">
      <transition-group class="min-container">
          <div v-for="(element, id) in playerList" :key="id" class="inner-container">
            {{element.name}}
          </div>
      </transition-group>
    </draggable>

    <draggable tag="ul" v-model="skillList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="skill-list">
      <transition-group class="min-container">
          <div v-for="(element, id) in skillList" :key="id" class="inner-container">
            {{element.name}}
          </div>
      </transition-group>
    </draggable>

    <div class="my-list">
      <div class="list">
        <draggable tag="ul" v-model="players1" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players1" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills1" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills1" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players2" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players2" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills2" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills2" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players3" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players3" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills3" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills3" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players4" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players4" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills4" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills4" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players5" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players5" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills5" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills5" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players6" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players6" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills6" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills6" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players7" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players7" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills7" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills7" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="list">
        <draggable tag="ul" v-model="players8" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in players8" :key="id" class="inner-container left">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
        <draggable tag="ul" v-model="skills8" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" class="test">
          <transition-group class="min-container">
            <div v-for="(element, id) in skills8" :key="id" class="inner-container">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import players from '../../utils/players.js';
import skills from '../../utils/skills.js';

export default {
  data() {
    return {
      players1: [],
      skills1: [],
      players2: [],
      skills2: [],
      players3: [],
      skills3: [],
      players4: [],
      skills4: [],
      players5: [],
      skills5: [],
      players6: [],
      skills6: [],
      players7: [],
      skills7: [],
      players8: [],
      skills8: [],
      playerList: players.map(e => {
        return {
          name: e,
          fixed: false,
        };
      }),
      skillList: skills.map(e => {
        return {
          name: e,
          fixed: false,
        };
      }),
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
  font-size: 15px;
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

.list {
  display: flex;
  flex-direction: row;
  border: 2px solid red;
}

.list + .list {
  margin-top: 10px;
  margin-left: 10px;
}

.min-container {
  min-height: 100px;
  min-width: 100px;
}

.left + .left {
  margin-top: 40px;
}

.test {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.test + .test {
  border-left: 1px solid black;
}

</style>
