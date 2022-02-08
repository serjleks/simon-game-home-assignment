<template>
  <button
    type="button"
    class="ui-button"
    :class="{ 'ui-button__active': active }"
    v-on="$listeners"
  >
    <div class="ui-button__layout">
      <div class="ui-button__content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: "UIButton",
  props: {
    active: Boolean,
  },
};
</script>

<style scoped>
.ui-button {
  display: inline-block;

  min-height: 32px;

  padding: 4px 12px;
  border-radius: 2px;

  font-size: 14px;
  font-family: inherit;
  text-align: center;

  cursor: pointer;
  user-select: none;

  outline: 0;
  border: 1px solid var(--ui-button-default-border-color);
  color: var(--ui-button-default-color);
  background: var(--ui-button-default-bg-color);
}

.ui-button__active {
  color: var(--ui-button-active-color);
  border-color: var(--accent-color);
  border-width: 2px;
}

.ui-button__layout {
  display: flex;
  justify-content: center;
}

.ui-button:hover,
.ui-button:active {
  color: var(--ui-button-default-hover-color);
  border-color: var(--accent-color);
  background-color: var(--ui-button-default-hover-bg-color);
}

.ui-button:focus {
  outline: 0;
  border-color: var(--accent-color);
}
</style>
