/**
 * Dinamically load script into DOM
 * @see https://gist.github.com/lidio601/81974ecf4564dbf257f80a969dcbdd5c
 *
 * Example usage:
 * {code}

  require('./loadScript');

  console.log('starting');
  loadScripts([
    "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OpusMediaRecorder.umd.js",
    "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/encoderWorker.umd.js"
  ], { debug: true })
    .then(() => console.log("finished"))
    .catch(console.error);
 {/code}
 */

/**
 * @see https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript
 */
export const loadScript = (
  source,
  {
    beforeEl = false,
    afterEl = false,
    async = true,
    defer = true,
    debug = false
  } = {}
) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    const shouldInjectBefore = !afterEl; // defaults to before
    const scripts = document.getElementsByTagName("script");

    // check whenever this script is not already included!
    const existingOne = Array.prototype.slice
      .call(scripts)
      .filter(elem => elem.src === source);

    if (existingOne.length) {
      debug && console.warn("loadScript :: skipped because it's already loaded", {
        source
      });

      return resolve(existingOne);
    }

    const prior = beforeEl || (scripts.length > 0 ? scripts[0] : null);
    const after = afterEl || (scripts.length > 0 ? [scripts.length - 1] : null);

    script.async = async;
    script.defer = defer;

    function onloadHander(_, isAbort) {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject(
            new Error(`loadScript :: error while loading script from ${script}`)
          );
        } else {
          resolve(script);
        }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;

    if (shouldInjectBefore && beforeEl) {
      prior.parentNode.insertBefore(script, prior);
    } else if (!shouldInjectBefore && afterEl) {
      // Note: There is no insertAfter() method.
      // It can be emulated by combining the insertBefore method with Node.nextSibling.
      prior.parentNode.insertBefore(script, after.nextSibling);
    } else {
      document.head.appendChild(script);
    }
  });
};

export const loadScripts = async (
  sources,
  {
    beforeEl = false,
    afterEl = false,
    async = true,
    defer = true,
    debug = false
  } = {}
) => {
  // defaults to []
  sources = sources || [];
  // ensure that is an array
  sources = typeof sources.forEach === "function" ? sources : [sources];
  // if it's empty
  if (sources.length === 0) {
    debug && console.log("loadScripts :: ended");
    return;
  }

  // include scripts in order
  const firstScript = sources.shift();
  debug && console.log("loadScripts :: loading", firstScript);

  return (
    loadScript(firstScript, { beforeEl, afterEl, async, defer })
      // recursion here!
      .then(elem => {
        debug && console.log("loadScripts :: loaded", firstScript);

        return loadScripts(sources, {
          // continue injecting the other scripts
          // after this one
          afterEl: elem,
          async,
          defer,
          debug
        });
      })
  );
};
