window.carbon = window.carbon || {};

(function($) {

	var carbon = window.carbon;

	if (typeof carbon.fields === 'undefined') {
		return false;
	}


	/*
	|--------------------------------------------------------------------------
	| Icon Field MODEL
	|--------------------------------------------------------------------------
	|
	| This class represents the model for the field.
	|
	| A model is responsible for holding the fields current state (data).
	| It also has all the logic surrounding the data management, like: 
	|  - conversion
	|  - validation
	|  - access control
	|
	*/
	carbon.fields.Model.Icon = carbon.fields.Model.extend({
		/*
		// Set some default values if need. They will be stored in the model attributes.
		defaults: {
			'options': []
		},
		*/

		initialize: function() {
			carbon.fields.Model.prototype.initialize.apply(this);  // do not delete

			// Model data manipulations can be done here. For example:
			/*
			var _this = this;
			var value = this.get('value');
			var options = this.get('options') || [];

			// If no value, set the first option as value
			if (!value) {
				_.each(options, function(option) {
					_this.set('value', option.value);
					return false;
				});
			}
			*/

		},

		/*
		 * The validate method is an internal Backbone method.
		 * It will check if the field model data is valid.
		 * 
		 * @see http://backbonejs.org/#Model-validate
		 */
		/*
		validate: function(attrs, options) {
			var hasErrors = false;

			if (!attrs.value) {
				hasErrors = true;
			}

			return hasErrors;
		}
		*/
	});


	/*
	|--------------------------------------------------------------------------
	| Icon Field VIEW
	|--------------------------------------------------------------------------
	|
	| Holds the field DOM interactions (rendering, error state, etc..).
	| The field view also SYNCs the user entered data with the model.
	|
	| Views reflect what the applications data models look like.
	| They also listen to events and react accordingly.
	|
	| @element: .[id]
	| @holder:  carbon.views[id]
	|
	*/
	carbon.fields.View.Icon = carbon.fields.View.extend({
		
		// Add the events from the parent view and also include new ones
		events: function() {
			return _.extend({}, carbon.fields.View.prototype.events, {
				'click .font-awesome-icons li': 'addIcon',
				'keyup .icons-search-field': 'searchIcons',
			});
		},
		
		initialize: function() {
			// Initialize the parent view
			carbon.fields.View.prototype.initialize.apply(this); // do not delete

			// Wait for the field to be added to the DOM and run an init method
			this.on('field:rendered', this.initField);
		},

		addIcon: function(event) {

			var $element = $(event.target);
			if ( $element.prop('tagName').toLowerCase() == 'i' ) {
				$element = $element.parent();
			}

			var icons_container = $element.parents('.icons-container');
			var icon_type 		= icons_container.find('.icon-type').data('icon-type');

			$element.siblings().removeClass('selected')
			$element.addClass('selected');

			var icon_class 		= $element.find('i').data('value');
			var icon_preview_el = icons_container.find('.icon-preview');
			var icon_element    = icons_container.find('.icon-field-value')

			icon_preview_el.removeClass();
			icon_preview_el.addClass('icon-preview ' + ' ' + icon_type + ' ' + icon_class)
			icon_element.val(icon_class);

		},

		searchIcons: function(event) {

			var $element = $(event.target);
			var value 	 = $element.val();

			if ( value.length ) {

				var regex 		    = new RegExp('.*' + value + '.*');
				var no_results_text = $element.siblings('.no-results');
				var has_visible_items = false;

				var visible_list_items = $('.font-awesome-icons li').filter(function() {

					var match = $(this).find('i').data('value').match('.*' + value + '.*');
					if ( !match ) {
						$(this).hide();
					} else {
						$(this).show();
						has_visible_items = true;
					}

				});

				if ( !has_visible_items ) {
					$('.font-awesome-icons').hide();
					no_results_text.addClass('visible');
				} else {
					$('.font-awesome-icons').show();
					no_results_text.removeClass('visible');
				}

			}

		},

		/*
		 * Initialize the code responsible for the DOM manipulations
		 */
		initField: function() {

		},

		/*
		 * Syncs the user entered value with the model. 
		 * By default this method is fired when the input value has changed.
		 *
		 * If the field has more then one input, this method should be overwritten!
		 */
		/*
		sync: function(event) {
			var $input = this.$el.find('input.example-field');
			var value = $input.val();

			this.model.set('value', value);
		},
		*/
	});

}(jQuery));