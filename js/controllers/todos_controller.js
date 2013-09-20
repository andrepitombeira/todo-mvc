Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function () {
			var title = this.get('newTitle');
			if(!title.trim()) { return; }

			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});

			this.set('newTitle', '');

			todo.save();
		},

		remaining: function () {
			return this.filterProperty('isCompleted', false).get('length');
		}.property('@each.isCompleted'),

		inflection: function () {
			var remaining = this.get('remaining');
			return remaining === 1 ? 'item' : 'items';
		}.property('remaining'),

		clearCompleted: function () {
			var completed = this.filterProperty('isCompleted', true);
			completed.invoke('deleteRecord');
			completed.invoke('save');
		}	
	},

	hasCompleted: function () {
		return this.get('completed') > 0;
	}.property('completed'),

	completed: function () {
		return this.filterProperty('isCompleted', true).get('length');
	}.property('@each.isCompleted'),

	allAreDone: function (key, value) {
		if(value == undefined) {
			return !!this.get('length') && this.everyProperty('isCompleted', true);
		} else {
			this.setEach('isCompleted', true);
			this.invoke('save');
			return value;
		}
	}.property('@each.isCompleted')
});