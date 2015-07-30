/*!
 * Inline SVG Polyfill v.1.1.0
 * ----------------------------------------------------------------------------
 * Find inline SVG elements and replace them with a fallback image set via
 * the `data-fallback` attribute.
 *
 * @author David Street
 * @license MIT
 */


(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(exports);
	} else {
		// Browser globals
		var exports = {};
		factory(exports);
		root.InlineSVG = exports.InlineSVG;
	}
}(this, function (exports) {


	exports.InlineSVG = function() {
		var svgList = null
			, removeEl = [];

		/**
		 * Create a replacement element with the fallback image
		 */
		function _replaceSVG() {
			svgList = document.getElementsByTagName('svg');

			for (var i = 0, len = svgList.length; i < len; i += 1) {
				var fallback = svgList[i].getAttribute('data-fallback')
                    , fallbackSize = svgList[i].getAttribute('data-fallback-size')
					, parent = null
					, useEl = null
					, ref = null
					, replacement = null
					, viewBox;

				// Go to next element if no fallback was given
				if (!fallback) continue;

				useEl = svgList[i].getElementsByTagName('use');

				// Go to next element if the svg does not have a `use` child
				if (!useEl.length) continue;

				// Get the first `use` child
				useEl = useEl[0];

                // Get the viewBox reference element
                // The originating SVG element takes precedence
                if (svgList[i].getAttribute('viewBox')) {
                    ref = svgList[i];
                } else {
                    ref = document.getElementById(useEl.getAttribute('xlink:href').replace('#', ''));
                }

				// Go to next element if the svg doc we are referencing doesn't exist
				if (!ref || !ref.getAttribute('viewBox')) continue;

				viewBox = _getViewBox(ref);
				parent = svgList[i].parentElement;

                if (fallbackSize) {
                    fallbackSize = fallbackSize.split(' ');
                    viewBox = _resizeViewBox(viewBox, parseInt(fallbackSize[0]), parseInt(fallbackSize[1]));
                }

				replacement = _createReplacement(viewBox, fallback, svgList[i]);

				// Add new replacement element to the parent
				parent.insertBefore(replacement, svgList[i]);
				removeEl.push(svgList[i]);
			}

			_hideSVG();
		}

		/**
		 * Create a viewBox object for an element
		 *
		 * @param Object The element
		 *
		 * @return Object The viewBox
		 */
		function _getViewBox(el) {
			var attArray = []
				, viewBox = {};

			attArray = el.getAttribute('viewBox').split(' ');
			viewBox.x = attArray[0];
			viewBox.y = attArray[1];
			viewBox.width = attArray[2];
			viewBox.height = attArray[3];

			return viewBox;
		}

        /**
         * Resize the viewbox based on new width and height
         *
         * @param  Object The viewbox to transform
         * @param  Number New width
         * @param  Number New height
         *
         * @return Object
         */
        function _resizeViewBox(viewBox, width, height) {
            var ratioW = width / viewBox.width;
            var ratioH = height / viewBox.height;

            return {
                x: viewBox.x * ratioW,
                y: viewBox.y * ratioH,
                width: width,
                height: height
            };
        }

		/**
		 * Create new element with fallback background
		 *
		 * @param Object The viewBox object
		 * @param String The path to the fallback image
		 * @param Object The reference element
		 *
		 * @return Object The replacement element
		 */
		function _createReplacement(viewBox, fallback, ref) {
			var replacement;

			replacement = document.createElement('div');
			replacement.setAttribute('class', ref.getAttribute('class'));
			replacement.style.width = viewBox.width + 'px';
			replacement.style.height = viewBox.height + 'px';
			replacement.style.background = 'transparent url(' + fallback + ') no-repeat -' + viewBox.x + 'px -' + viewBox.y + 'px';

			return replacement;
		}

		/**
		 * Hide all elements that have been replaced
		 */
		function _hideSVG() {
			for (var i = 0, len = removeEl.length; i < len; i += 1) {
				removeEl[i].style.display = 'none';
			}
		}

		/**
		 * Check support for inline SVGs.
		 *
		 * Courtesy of Modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/svg/inline.js
		 *
		 * @return Boolean
		 */
		function _checkSupport() {
			var div = document.createElement('div');
			div.innerHTML = '<svg/>';
			return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
		}

		return {
			init: function(force) {
				// Exit if inline svg is supported by the browser
				if (!force && _checkSupport()) {
					return false;
				} else {
					_replaceSVG();
				}
			}
		};
	};


}));
