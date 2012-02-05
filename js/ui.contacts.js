/*
 * Contacts widget
 *
 * Dependecies: ui.contacts.css
 * Author: Jarret Gabel
 *
 * Usage:
 * $(div).contacts({data : json});
 *
 * To resize, adjust element size.
 *
 */

(function ($) {
	$.widget('ui.contacts', {

		// options
	    options: {
			data: null
	    },

		/**
		 * Create widget
		 */
		_create: function () {
			
			var arr, div = '';

			// create container
			div	+= '	<div class="ui-container">';
			div +=			this._getHeader();
			div += '		<div class="ui-inner">';

			// loop through content and create layout
			$.each(this.options.data, function (idx, item) {

				// create contact
				div += '		<div class="ui-contact">';
				div += '			<div class="ui-contact-header">';
				div += '				<div class="ui-circle ' + item.color + '"></div>';
				div += '				<div class="ui-name"><h3>' + item.name + '</h3></div>';
				div += '			</div>';
				div += '			<ul class="ui-deets">';

				// parse json
				arr = [];
				var p, position, i, obj, vo;

				for (p in item) {
					position = 666;
					if (p === 'email') { 
						position = 0;
					} else if (p === 'phone') {
						position = 1;
					} else if (p === 'street') {
						position = 2;
					} else if (p === 'city') {
						position = 3;
					}
					
					if(position !== 666) {
						obj = { 
							type: p, 
							prop: item[p]
						};
						arr[position] = obj;
					}
				}

				// create li
				for (i in arr) {
					vo = arr[i];
					if(vo.prop.indexOf('@') === -1) {
						div += '<li class="' + vo.type + '">' + vo.prop + '</li>';
					} else {
						div += '<li class="' + vo.type + '">';
						div += '	<a href="mailto:' + vo.prop + '">' + vo.prop + '</a>';
						div += '</li>';
					}
				}

				div += '			</ul>';
				div += '		</div>';
			});

			// create footer and close tags
			div += '		</div>';
			div +=			this._getFooter();
			div += '	</div>';

			$(div).appendTo(this.element)
					.find('.ui-inner').css({ 'height' : this.element.height() - 94 + 'px' });

			this._addListeners();
	    },

	    /**
		 * Get header
		 * @return {String}
		 */
		_getHeader: function () {
			var header = '';
			header += '		<div class="ui-header">';
			header += '			<div class="ui-title">Contacts</div>';
			header += '		</div>';

			return header;
	    },

	    /**
		 * Get footer
		 * @return {String}
		 */
		_getFooter: function () {
			var footer = '	';
			footer += '		<div class="ui-footer">';
			footer += '			<div class="ui-shadow"></div>';
			footer += '			<select name="selection" size="">';
			footer += '				<option selected value="email">Email address</option>';
			footer += '				<option value="phone">Phone number</option>';
			footer += '			</select>';
			footer += '		</div>';

			return footer;
		},

		/**
		 * Add listeners
		 */
		_addListeners: function () {
			var el = this.element, selectedVal, $this;

			// change type
			el.find('.ui-footer select').on('change', function () {
				$this = $(this);
				selectedVal = $this.find(':selected').val();
				
				$.each(el.find('.ui-deets'), function (idx, item) {
					var $item = $(item);
					$item.find('.' + selectedVal).prependTo($item.eq(0));
				});
			});
	    },

	    /**
		 * Add listeners
		 */
		_removeListeners: function () {
			this.element.find('#ui-footer select').unbind('change');
		},
		
		/**
		 * Destroy
		 */
		destroy: function () {
			this._removeListeners();
			this._super('_destroy');
		}
	});
}(jQuery));