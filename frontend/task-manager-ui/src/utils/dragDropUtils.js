// src/utils/dragDropUtils.js

export const dragDropUtils = {
  onDragStart: (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  },

  onDragOver: (e) => {
    e.preventDefault();
  },

  onDrop: (e, status, onStatusChange) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    if (task.status !== status) {
      onStatusChange(task.taskId, status);
    }
  }
};