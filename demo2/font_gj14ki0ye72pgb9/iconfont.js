;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-sanjiao-shang-wukuang-wudi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M330.666667 590.933333c-8.533333 0-17.066667-4.266667-23.466667-8.533333-2.133333-2.133333-4.266667-6.4-6.4-10.666667-4.266667-12.8-2.133333-25.6 6.4-34.133333l181.333333-181.333333c12.8-12.8 32-12.8 44.8 0l181.333334 181.333333c8.533333 8.533333 12.8 23.466667 6.4 34.133333-4.266667 12.8-17.066667 19.2-29.866667 19.2H330.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sanjiao-xia-wukuang-wudi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M693.333333 433.066667c8.533333 0 17.066667 4.266667 23.466667 8.533333 2.133333 2.133333 4.266667 6.4 6.4 10.666667 4.266667 12.8 2.133333 25.6-6.4 34.133333l-181.333333 181.333333c-12.8 12.8-32 12.8-44.8 0l-181.333334-181.333333c-8.533333-8.533333-12.8-23.466667-6.4-34.133333 4.266667-12.8 17.066667-19.2 29.866667-19.2h360.533333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)