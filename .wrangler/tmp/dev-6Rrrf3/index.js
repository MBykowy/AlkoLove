"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // .wrangler/tmp/bundle-oSTBXQ/checked-fetch.js
  function checkURL(request, init) {
    const url = request instanceof URL ? request : new URL(
      (typeof request === "string" ? new Request(request, init) : request).url
    );
    if (url.port && url.port !== "443" && url.protocol === "https:") {
      if (!urls.has(url.toString())) {
        urls.add(url.toString());
        console.warn(
          `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
        );
      }
    }
  }
  var urls;
  var init_checked_fetch = __esm({
    ".wrangler/tmp/bundle-oSTBXQ/checked-fetch.js"() {
      "use strict";
      urls = /* @__PURE__ */ new Set();
      globalThis.fetch = new Proxy(globalThis.fetch, {
        apply(target, thisArg, argArray) {
          const [request, init] = argArray;
          checkURL(request, init);
          return Reflect.apply(target, thisArg, argArray);
        }
      });
    }
  });

  // wrangler-modules-watch:wrangler:modules-watch
  var init_wrangler_modules_watch = __esm({
    "wrangler-modules-watch:wrangler:modules-watch"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
    }
  });

  // ../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/modules-watch-stub.js
  var init_modules_watch_stub = __esm({
    "../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/modules-watch-stub.js"() {
      init_wrangler_modules_watch();
    }
  });

  // ../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/common.ts
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }
  var __facade_middleware__;
  var init_common = __esm({
    "../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/common.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      __facade_middleware__ = [];
    }
  });

  // ../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/loader-sw.ts
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  var __FACADE_EVENT_TARGET__, __facade__originalAddEventListener__, __facade__originalRemoveEventListener__, __facade__originalDispatchEvent__, __facade_waitUntil__, __facade_response__, __facade_dispatched__, __Facade_ExtendableEvent__, __Facade_FetchEvent__, __Facade_ScheduledEvent__;
  var init_loader_sw = __esm({
    "../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/loader-sw.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      init_common();
      if (globalThis.MINIFLARE) {
        __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
      } else {
        __FACADE_EVENT_TARGET__ = new EventTarget();
      }
      __facade__originalAddEventListener__ = globalThis.addEventListener;
      __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
      __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
      globalThis.addEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.addEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalAddEventListener__(type, listener, options);
        }
      };
      globalThis.removeEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.removeEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalRemoveEventListener__(type, listener, options);
        }
      };
      globalThis.dispatchEvent = function(event) {
        if (__facade_isSpecialEvent__(event.type)) {
          return __FACADE_EVENT_TARGET__.dispatchEvent(event);
        } else {
          return __facade__originalDispatchEvent__(event);
        }
      };
      globalThis.addMiddleware = __facade_register__;
      globalThis.addMiddlewareInternal = __facade_registerInternal__;
      __facade_waitUntil__ = Symbol("__facade_waitUntil__");
      __facade_response__ = Symbol("__facade_response__");
      __facade_dispatched__ = Symbol("__facade_dispatched__");
      __Facade_ExtendableEvent__ = class extends Event {
        [__facade_waitUntil__] = [];
        waitUntil(promise) {
          if (!(this instanceof __Facade_ExtendableEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this[__facade_waitUntil__].push(promise);
        }
      };
      __Facade_FetchEvent__ = class extends __Facade_ExtendableEvent__ {
        #request;
        #passThroughOnException;
        [__facade_response__];
        [__facade_dispatched__] = false;
        constructor(type, init) {
          super(type);
          this.#request = init.request;
          this.#passThroughOnException = init.passThroughOnException;
        }
        get request() {
          return this.#request;
        }
        respondWith(response) {
          if (!(this instanceof __Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          if (this[__facade_response__] !== void 0) {
            throw new DOMException(
              "FetchEvent.respondWith() has already been called; it can only be called once.",
              "InvalidStateError"
            );
          }
          if (this[__facade_dispatched__]) {
            throw new DOMException(
              "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
              "InvalidStateError"
            );
          }
          this.stopImmediatePropagation();
          this[__facade_response__] = response;
        }
        passThroughOnException() {
          if (!(this instanceof __Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#passThroughOnException();
        }
      };
      __Facade_ScheduledEvent__ = class extends __Facade_ExtendableEvent__ {
        #scheduledTime;
        #cron;
        #noRetry;
        constructor(type, init) {
          super(type);
          this.#scheduledTime = init.scheduledTime;
          this.#cron = init.cron;
          this.#noRetry = init.noRetry;
        }
        get scheduledTime() {
          return this.#scheduledTime;
        }
        get cron() {
          return this.#cron;
        }
        noRetry() {
          if (!(this instanceof __Facade_ScheduledEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#noRetry();
        }
      };
      __facade__originalAddEventListener__("fetch", (event) => {
        const ctx = {
          waitUntil: event.waitUntil.bind(event),
          passThroughOnException: event.passThroughOnException.bind(event)
        };
        const __facade_sw_dispatch__ = function(type, init) {
          if (type === "scheduled") {
            const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
              scheduledTime: Date.now(),
              cron: init.cron ?? "",
              noRetry() {
              }
            });
            __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
            event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          }
        };
        const __facade_sw_fetch__ = function(request, _env, ctx2) {
          const facadeEvent = new __Facade_FetchEvent__("fetch", {
            request,
            passThroughOnException: ctx2.passThroughOnException
          });
          __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
          facadeEvent[__facade_dispatched__] = true;
          event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          const response = facadeEvent[__facade_response__];
          if (response === void 0) {
            throw new Error("No response!");
          }
          return response;
        };
        event.respondWith(
          __facade_invoke__(
            event.request,
            globalThis,
            ctx,
            __facade_sw_dispatch__,
            __facade_sw_fetch__
          )
        );
      });
      __facade__originalAddEventListener__("scheduled", (event) => {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: event.scheduledTime,
          cron: event.cron,
          noRetry: event.noRetry.bind(event)
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      });
    }
  });

  // ../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody, middleware_ensure_req_body_drained_default;
  var init_middleware_ensure_req_body_drained = __esm({
    "../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      drainBody = async (request, env, _ctx, middlewareCtx) => {
        try {
          return await middlewareCtx.next(request, env);
        } finally {
          try {
            if (request.body !== null && !request.bodyUsed) {
              const reader = request.body.getReader();
              while (!(await reader.read()).done) {
              }
            }
          } catch (e) {
            console.error("Failed to drain the unused request body.", e);
          }
        }
      };
      middleware_ensure_req_body_drained_default = drainBody;
    }
  });

  // ../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  var jsonError, middleware_miniflare3_json_error_default;
  var init_middleware_miniflare3_json_error = __esm({
    "../.nvm/versions/node/v21.7.3/bin/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      jsonError = async (request, env, _ctx, middlewareCtx) => {
        try {
          return await middlewareCtx.next(request, env);
        } catch (e) {
          const error = reduceError(e);
          return Response.json(error, {
            status: 500,
            headers: { "MF-Experimental-Error-Stack": "true" }
          });
        }
      };
      middleware_miniflare3_json_error_default = jsonError;
    }
  });

  // .wrangler/tmp/bundle-oSTBXQ/middleware-insertion-facade.js
  var init_middleware_insertion_facade = __esm({
    ".wrangler/tmp/bundle-oSTBXQ/middleware-insertion-facade.js"() {
      "use strict";
      init_loader_sw();
      init_middleware_ensure_req_body_drained();
      init_middleware_miniflare3_json_error();
      __facade_registerInternal__([middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default]);
    }
  });

  // node_modules/mime/Mime.js
  var require_Mime = __commonJS({
    "node_modules/mime/Mime.js"(exports, module) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      function Mime() {
        this._types = /* @__PURE__ */ Object.create(null);
        this._extensions = /* @__PURE__ */ Object.create(null);
        for (let i = 0; i < arguments.length; i++) {
          this.define(arguments[i]);
        }
        this.define = this.define.bind(this);
        this.getType = this.getType.bind(this);
        this.getExtension = this.getExtension.bind(this);
      }
      Mime.prototype.define = function(typeMap, force) {
        for (let type in typeMap) {
          let extensions = typeMap[type].map(function(t) {
            return t.toLowerCase();
          });
          type = type.toLowerCase();
          for (let i = 0; i < extensions.length; i++) {
            const ext = extensions[i];
            if (ext[0] === "*") {
              continue;
            }
            if (!force && ext in this._types) {
              throw new Error(
                'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
              );
            }
            this._types[ext] = type;
          }
          if (force || !this._extensions[type]) {
            const ext = extensions[0];
            this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
          }
        }
      };
      Mime.prototype.getType = function(path) {
        path = String(path);
        let last = path.replace(/^.*[/\\]/, "").toLowerCase();
        let ext = last.replace(/^.*\./, "").toLowerCase();
        let hasPath = last.length < path.length;
        let hasDot = ext.length < last.length - 1;
        return (hasDot || !hasPath) && this._types[ext] || null;
      };
      Mime.prototype.getExtension = function(type) {
        type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
        return type && this._extensions[type.toLowerCase()] || null;
      };
      module.exports = Mime;
    }
  });

  // node_modules/mime/types/standard.js
  var require_standard = __commonJS({
    "node_modules/mime/types/standard.js"(exports, module) {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    }
  });

  // node_modules/mime/types/other.js
  var require_other = __commonJS({
    "node_modules/mime/types/other.js"(exports, module) {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    }
  });

  // node_modules/mime/index.js
  var require_mime = __commonJS({
    "node_modules/mime/index.js"(exports, module) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      var Mime = require_Mime();
      module.exports = new Mime(require_standard(), require_other());
    }
  });

  // node_modules/@cloudflare/kv-asset-handler/dist/types.js
  var require_types = __commonJS({
    "node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
      var KVError = class extends Error {
        constructor(message, status = 500) {
          super(message);
          Object.setPrototypeOf(this, new.target.prototype);
          this.name = KVError.name;
          this.status = status;
        }
      };
      exports.KVError = KVError;
      var MethodNotAllowedError = class extends KVError {
        constructor(message = `Not a valid request method`, status = 405) {
          super(message, status);
        }
      };
      exports.MethodNotAllowedError = MethodNotAllowedError;
      var NotFoundError = class extends KVError {
        constructor(message = `Not Found`, status = 404) {
          super(message, status);
        }
      };
      exports.NotFoundError = NotFoundError;
      var InternalError = class extends KVError {
        constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
          super(message, status);
        }
      };
      exports.InternalError = InternalError;
    }
  });

  // node_modules/@cloudflare/kv-asset-handler/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
      var mime = require_mime();
      var types_1 = require_types();
      Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
        return types_1.MethodNotAllowedError;
      } });
      Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
        return types_1.NotFoundError;
      } });
      Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
        return types_1.InternalError;
      } });
      var defaultCacheControl = {
        browserTTL: null,
        edgeTTL: 2 * 60 * 60 * 24,
        // 2 days
        bypassCache: false
        // do not bypass Cloudflare's cache
      };
      var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
      var getAssetFromKVDefaultOptions = {
        ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
        ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : {},
        cacheControl: defaultCacheControl,
        defaultMimeType: "text/plain",
        defaultDocument: "index.html",
        pathIsEncoded: false,
        defaultETag: "strong"
      };
      function assignOptions(options) {
        return Object.assign({}, getAssetFromKVDefaultOptions, options);
      }
      var mapRequestToAsset = (request, options) => {
        options = assignOptions(options);
        const parsedUrl = new URL(request.url);
        let pathname = parsedUrl.pathname;
        if (pathname.endsWith("/")) {
          pathname = pathname.concat(options.defaultDocument);
        } else if (!mime.getType(pathname)) {
          pathname = pathname.concat("/" + options.defaultDocument);
        }
        parsedUrl.pathname = pathname;
        return new Request(parsedUrl.toString(), request);
      };
      exports.mapRequestToAsset = mapRequestToAsset;
      function serveSinglePageApp(request, options) {
        options = assignOptions(options);
        request = mapRequestToAsset(request, options);
        const parsedUrl = new URL(request.url);
        if (parsedUrl.pathname.endsWith(".html")) {
          return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
        } else {
          return request;
        }
      }
      exports.serveSinglePageApp = serveSinglePageApp;
      var getAssetFromKV2 = async (event, options) => {
        options = assignOptions(options);
        const request = event.request;
        const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
        const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
        if (typeof ASSET_NAMESPACE === "undefined") {
          throw new types_1.InternalError(`there is no KV namespace bound to the script`);
        }
        const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
        let pathIsEncoded = options.pathIsEncoded;
        let requestKey;
        if (options.mapRequestToAsset) {
          requestKey = options.mapRequestToAsset(request);
        } else if (ASSET_MANIFEST[rawPathKey]) {
          requestKey = request;
        } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
          pathIsEncoded = true;
          requestKey = request;
        } else {
          const mappedRequest = mapRequestToAsset(request);
          const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
          if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
            pathIsEncoded = true;
            requestKey = mappedRequest;
          } else {
            requestKey = mapRequestToAsset(request, options);
          }
        }
        const SUPPORTED_METHODS = ["GET", "HEAD"];
        if (!SUPPORTED_METHODS.includes(requestKey.method)) {
          throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
        }
        const parsedUrl = new URL(requestKey.url);
        const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
        let pathKey = pathname.replace(/^\/+/, "");
        const cache = caches.default;
        let mimeType = mime.getType(pathKey) || options.defaultMimeType;
        if (mimeType.startsWith("text") || mimeType === "application/javascript") {
          mimeType += "; charset=utf-8";
        }
        let shouldEdgeCache = false;
        if (typeof ASSET_MANIFEST !== "undefined") {
          if (ASSET_MANIFEST[pathKey]) {
            pathKey = ASSET_MANIFEST[pathKey];
            shouldEdgeCache = true;
          }
        }
        let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
        const evalCacheOpts = (() => {
          switch (typeof options.cacheControl) {
            case "function":
              return options.cacheControl(request);
            case "object":
              return options.cacheControl;
            default:
              return defaultCacheControl;
          }
        })();
        const formatETag = (entityId = pathKey, validatorType = options.defaultETag) => {
          if (!entityId) {
            return "";
          }
          switch (validatorType) {
            case "weak":
              if (!entityId.startsWith("W/")) {
                if (entityId.startsWith(`"`) && entityId.endsWith(`"`)) {
                  return `W/${entityId}`;
                }
                return `W/"${entityId}"`;
              }
              return entityId;
            case "strong":
              if (entityId.startsWith(`W/"`)) {
                entityId = entityId.replace("W/", "");
              }
              if (!entityId.endsWith(`"`)) {
                entityId = `"${entityId}"`;
              }
              return entityId;
            default:
              return "";
          }
        };
        options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
        if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
          shouldEdgeCache = false;
        }
        const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
        let response = null;
        if (shouldEdgeCache) {
          response = await cache.match(cacheKey);
        }
        if (response) {
          if (response.status > 300 && response.status < 400) {
            if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
              response.body.cancel();
            } else {
            }
            response = new Response(null, response);
          } else {
            let opts = {
              headers: new Headers(response.headers),
              status: 0,
              statusText: ""
            };
            opts.headers.set("cf-cache-status", "HIT");
            if (response.status) {
              opts.status = response.status;
              opts.statusText = response.statusText;
            } else if (opts.headers.has("Content-Range")) {
              opts.status = 206;
              opts.statusText = "Partial Content";
            } else {
              opts.status = 200;
              opts.statusText = "OK";
            }
            response = new Response(response.body, opts);
          }
        } else {
          const body = await ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
          if (body === null) {
            throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
          }
          response = new Response(body);
          if (shouldEdgeCache) {
            response.headers.set("Accept-Ranges", "bytes");
            response.headers.set("Content-Length", String(body.byteLength));
            if (!response.headers.has("etag")) {
              response.headers.set("etag", formatETag(pathKey));
            }
            response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
            event.waitUntil(cache.put(cacheKey, response.clone()));
            response.headers.set("CF-Cache-Status", "MISS");
          }
        }
        response.headers.set("Content-Type", mimeType);
        if (response.status === 304) {
          let etag = formatETag(response.headers.get("etag"));
          let ifNoneMatch = cacheKey.headers.get("if-none-match");
          let proxyCacheStatus = response.headers.get("CF-Cache-Status");
          if (etag) {
            if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
              response.headers.set("CF-Cache-Status", "EXPIRED");
            } else {
              response.headers.set("CF-Cache-Status", "REVALIDATED");
            }
            response.headers.set("etag", formatETag(etag, "weak"));
          }
        }
        if (shouldSetBrowserCache) {
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
        } else {
          response.headers.delete("Cache-Control");
        }
        return response;
      };
      exports.getAssetFromKV = getAssetFromKV2;
    }
  });

  // src/index.ts
  init_checked_fetch();
  init_middleware_insertion_facade();
  init_modules_watch_stub();
  var import_kv_asset_handler = __toESM(require_dist());

  // node_modules/@neondatabase/serverless/index.mjs
  init_checked_fetch();
  init_middleware_insertion_facade();
  init_modules_watch_stub();
  var ro = Object.create;
  var Ie = Object.defineProperty;
  var no = Object.getOwnPropertyDescriptor;
  var io = Object.getOwnPropertyNames;
  var so = Object.getPrototypeOf;
  var oo = Object.prototype.hasOwnProperty;
  var ao = (r, e, t) => e in r ? Ie(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
  var a = (r, e) => Ie(r, "name", { value: e, configurable: true });
  var $ = (r, e) => () => (r && (e = r(r = 0)), e);
  var I = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
  var te = (r, e) => {
    for (var t in e)
      Ie(r, t, { get: e[t], enumerable: true });
  };
  var An = (r, e, t, n) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let i of io(e))
        !oo.call(r, i) && i !== t && Ie(r, i, { get: () => e[i], enumerable: !(n = no(e, i)) || n.enumerable });
    return r;
  };
  var We = (r, e, t) => (t = r != null ? ro(so(r)) : {}, An(e || !r || !r.__esModule ? Ie(t, "default", {
    value: r,
    enumerable: true
  }) : t, r));
  var O = (r) => An(Ie({}, "__esModule", { value: true }), r);
  var T = (r, e, t) => (ao(r, typeof e != "symbol" ? e + "" : e, t), t);
  var Tn = I((it) => {
    "use strict";
    p();
    it.byteLength = co;
    it.toByteArray = lo;
    it.fromByteArray = yo;
    var ae = [], re = [], uo = typeof Uint8Array < "u" ? Uint8Array : Array, It = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (Ee = 0, Cn = It.length; Ee < Cn; ++Ee)
      ae[Ee] = It[Ee], re[It.charCodeAt(Ee)] = Ee;
    var Ee, Cn;
    re[45] = 62;
    re[95] = 63;
    function In(r) {
      var e = r.length;
      if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var t = r.indexOf("=");
      t === -1 && (t = e);
      var n = t === e ? 0 : 4 - t % 4;
      return [t, n];
    }
    a(
      In,
      "getLens"
    );
    function co(r) {
      var e = In(r), t = e[0], n = e[1];
      return (t + n) * 3 / 4 - n;
    }
    a(co, "byteLength");
    function ho(r, e, t) {
      return (e + t) * 3 / 4 - t;
    }
    a(ho, "_byteLength");
    function lo(r) {
      var e, t = In(r), n = t[0], i = t[1], s = new uo(ho(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
      for (c = 0; c < u; c += 4)
        e = re[r.charCodeAt(c)] << 18 | re[r.charCodeAt(c + 1)] << 12 | re[r.charCodeAt(c + 2)] << 6 | re[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
      return i === 2 && (e = re[r.charCodeAt(c)] << 2 | re[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = re[r.charCodeAt(
        c
      )] << 10 | re[r.charCodeAt(c + 1)] << 4 | re[r.charCodeAt(c + 2)] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
    }
    a(lo, "toByteArray");
    function fo(r) {
      return ae[r >> 18 & 63] + ae[r >> 12 & 63] + ae[r >> 6 & 63] + ae[r & 63];
    }
    a(fo, "tripletToBase64");
    function po(r, e, t) {
      for (var n, i = [], s = e; s < t; s += 3)
        n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(fo(n));
      return i.join(
        ""
      );
    }
    a(po, "encodeChunk");
    function yo(r) {
      for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s)
        i.push(po(r, o, o + s > u ? u : o + s));
      return n === 1 ? (e = r[t - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "=")), i.join("");
    }
    a(yo, "fromByteArray");
  });
  var Pn = I((Tt) => {
    p();
    Tt.read = function(r, e, t, n, i) {
      var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, h = c >> 1, l = -7, y = t ? i - 1 : 0, x = t ? -1 : 1, A = r[e + y];
      for (y += x, s = A & (1 << -l) - 1, A >>= -l, l += u; l > 0; s = s * 256 + r[e + y], y += x, l -= 8)
        ;
      for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = o * 256 + r[e + y], y += x, l -= 8)
        ;
      if (s === 0)
        s = 1 - h;
      else {
        if (s === c)
          return o ? NaN : (A ? -1 : 1) * (1 / 0);
        o = o + Math.pow(2, n), s = s - h;
      }
      return (A ? -1 : 1) * o * Math.pow(2, s - n);
    };
    Tt.write = function(r, e, t, n, i, s) {
      var o, u, c, h = s * 8 - i - 1, l = (1 << h) - 1, y = l >> 1, x = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, A = n ? 0 : s - 1, B = n ? 1 : -1, W = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + y >= 1 ? e += x / c : e += x * Math.pow(2, 1 - y), e * c >= 2 && (o++, c /= 2), o + y >= l ? (u = 0, o = l) : o + y >= 1 ? (u = (e * c - 1) * Math.pow(
        2,
        i
      ), o = o + y) : (u = e * Math.pow(2, y - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + A] = u & 255, A += B, u /= 256, i -= 8)
        ;
      for (o = o << i | u, h += i; h > 0; r[t + A] = o & 255, A += B, o /= 256, h -= 8)
        ;
      r[t + A - B] |= W * 128;
    };
  });
  var $n = I((Le) => {
    "use strict";
    p();
    var Pt = Tn(), Pe = Pn(), Bn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    Le.Buffer = f;
    Le.SlowBuffer = xo;
    Le.INSPECT_MAX_BYTES = 50;
    var st = 2147483647;
    Le.kMaxLength = st;
    f.TYPED_ARRAY_SUPPORT = mo();
    !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    function mo() {
      try {
        let r = new Uint8Array(1), e = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r, e), r.foo() === 42;
      } catch {
        return false;
      }
    }
    a(mo, "typedArraySupport");
    Object.defineProperty(
      f.prototype,
      "parent",
      { enumerable: true, get: function() {
        if (f.isBuffer(this))
          return this.buffer;
      } }
    );
    Object.defineProperty(f.prototype, "offset", { enumerable: true, get: function() {
      if (f.isBuffer(
        this
      ))
        return this.byteOffset;
    } });
    function fe(r) {
      if (r > st)
        throw new RangeError('The value "' + r + '" is invalid for option "size"');
      let e = new Uint8Array(r);
      return Object.setPrototypeOf(e, f.prototype), e;
    }
    a(fe, "createBuffer");
    function f(r, e, t) {
      if (typeof r == "number") {
        if (typeof e == "string")
          throw new TypeError('The "string" argument must be of type string. Received type number');
        return Ft(r);
      }
      return Mn(r, e, t);
    }
    a(f, "Buffer");
    f.poolSize = 8192;
    function Mn(r, e, t) {
      if (typeof r == "string")
        return wo(r, e);
      if (ArrayBuffer.isView(r))
        return bo(r);
      if (r == null)
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
      if (ue(r, ArrayBuffer) || r && ue(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r, SharedArrayBuffer) || r && ue(r.buffer, SharedArrayBuffer)))
        return Lt(
          r,
          e,
          t
        );
      if (typeof r == "number")
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      let n = r.valueOf && r.valueOf();
      if (n != null && n !== r)
        return f.from(n, e, t);
      let i = So(r);
      if (i)
        return i;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
        return f.from(r[Symbol.toPrimitive](
          "string"
        ), e, t);
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    }
    a(
      Mn,
      "from"
    );
    f.from = function(r, e, t) {
      return Mn(r, e, t);
    };
    Object.setPrototypeOf(
      f.prototype,
      Uint8Array.prototype
    );
    Object.setPrototypeOf(f, Uint8Array);
    function Dn(r) {
      if (typeof r != "number")
        throw new TypeError('"size" argument must be of type number');
      if (r < 0)
        throw new RangeError(
          'The value "' + r + '" is invalid for option "size"'
        );
    }
    a(Dn, "assertSize");
    function go(r, e, t) {
      return Dn(r), r <= 0 ? fe(r) : e !== void 0 ? typeof t == "string" ? fe(r).fill(e, t) : fe(r).fill(
        e
      ) : fe(r);
    }
    a(go, "alloc");
    f.alloc = function(r, e, t) {
      return go(r, e, t);
    };
    function Ft(r) {
      return Dn(r), fe(r < 0 ? 0 : Mt(r) | 0);
    }
    a(Ft, "allocUnsafe");
    f.allocUnsafe = function(r) {
      return Ft(
        r
      );
    };
    f.allocUnsafeSlow = function(r) {
      return Ft(r);
    };
    function wo(r, e) {
      if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e))
        throw new TypeError("Unknown encoding: " + e);
      let t = kn(r, e) | 0, n = fe(t), i = n.write(r, e);
      return i !== t && (n = n.slice(0, i)), n;
    }
    a(wo, "fromString");
    function Bt(r) {
      let e = r.length < 0 ? 0 : Mt(r.length) | 0, t = fe(e);
      for (let n = 0; n < e; n += 1)
        t[n] = r[n] & 255;
      return t;
    }
    a(Bt, "fromArrayLike");
    function bo(r) {
      if (ue(r, Uint8Array)) {
        let e = new Uint8Array(r);
        return Lt(e.buffer, e.byteOffset, e.byteLength);
      }
      return Bt(
        r
      );
    }
    a(bo, "fromArrayView");
    function Lt(r, e, t) {
      if (e < 0 || r.byteLength < e)
        throw new RangeError(
          '"offset" is outside of buffer bounds'
        );
      if (r.byteLength < e + (t || 0))
        throw new RangeError(
          '"length" is outside of buffer bounds'
        );
      let n;
      return e === void 0 && t === void 0 ? n = new Uint8Array(
        r
      ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
        n,
        f.prototype
      ), n;
    }
    a(Lt, "fromArrayBuffer");
    function So(r) {
      if (f.isBuffer(r)) {
        let e = Mt(
          r.length
        ) | 0, t = fe(e);
        return t.length === 0 || r.copy(t, 0, 0, e), t;
      }
      if (r.length !== void 0)
        return typeof r.length != "number" || kt(r.length) ? fe(0) : Bt(r);
      if (r.type === "Buffer" && Array.isArray(r.data))
        return Bt(r.data);
    }
    a(So, "fromObject");
    function Mt(r) {
      if (r >= st)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + st.toString(16) + " bytes");
      return r | 0;
    }
    a(Mt, "checked");
    function xo(r) {
      return +r != r && (r = 0), f.alloc(+r);
    }
    a(xo, "SlowBuffer");
    f.isBuffer = a(function(e) {
      return e != null && e._isBuffer === true && e !== f.prototype;
    }, "isBuffer");
    f.compare = a(function(e, t) {
      if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), ue(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t))
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (e === t)
        return 0;
      let n = e.length, i = t.length;
      for (let s = 0, o = Math.min(n, i); s < o; ++s)
        if (e[s] !== t[s]) {
          n = e[s], i = t[s];
          break;
        }
      return n < i ? -1 : i < n ? 1 : 0;
    }, "compare");
    f.isEncoding = a(function(e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, "isEncoding");
    f.concat = a(function(e, t) {
      if (!Array.isArray(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (e.length === 0)
        return f.alloc(0);
      let n;
      if (t === void 0)
        for (t = 0, n = 0; n < e.length; ++n)
          t += e[n].length;
      let i = f.allocUnsafe(t), s = 0;
      for (n = 0; n < e.length; ++n) {
        let o = e[n];
        if (ue(o, Uint8Array))
          s + o.length > i.length ? (f.isBuffer(
            o
          ) || (o = f.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
        else if (f.isBuffer(
          o
        ))
          o.copy(i, s);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        s += o.length;
      }
      return i;
    }, "concat");
    function kn(r, e) {
      if (f.isBuffer(r))
        return r.length;
      if (ArrayBuffer.isView(r) || ue(r, ArrayBuffer))
        return r.byteLength;
      if (typeof r != "string")
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
      let t = r.length, n = arguments.length > 2 && arguments[2] === true;
      if (!n && t === 0)
        return 0;
      let i = false;
      for (; ; )
        switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return t;
          case "utf8":
          case "utf-8":
            return Rt(r).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return t * 2;
          case "hex":
            return t >>> 1;
          case "base64":
            return Gn(r).length;
          default:
            if (i)
              return n ? -1 : Rt(r).length;
            e = ("" + e).toLowerCase(), i = true;
        }
    }
    a(kn, "byteLength");
    f.byteLength = kn;
    function vo(r, e, t) {
      let n = false;
      if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e))
        return "";
      for (r || (r = "utf8"); ; )
        switch (r) {
          case "hex":
            return Ro(
              this,
              e,
              t
            );
          case "utf8":
          case "utf-8":
            return On(this, e, t);
          case "ascii":
            return Bo(
              this,
              e,
              t
            );
          case "latin1":
          case "binary":
            return Lo(this, e, t);
          case "base64":
            return To(
              this,
              e,
              t
            );
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Fo(this, e, t);
          default:
            if (n)
              throw new TypeError("Unknown encoding: " + r);
            r = (r + "").toLowerCase(), n = true;
        }
    }
    a(
      vo,
      "slowToString"
    );
    f.prototype._isBuffer = true;
    function _e(r, e, t) {
      let n = r[e];
      r[e] = r[t], r[t] = n;
    }
    a(_e, "swap");
    f.prototype.swap16 = a(function() {
      let e = this.length;
      if (e % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t = 0; t < e; t += 2)
        _e(this, t, t + 1);
      return this;
    }, "swap16");
    f.prototype.swap32 = a(function() {
      let e = this.length;
      if (e % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t = 0; t < e; t += 4)
        _e(this, t, t + 3), _e(this, t + 1, t + 2);
      return this;
    }, "swap32");
    f.prototype.swap64 = a(function() {
      let e = this.length;
      if (e % 8 !== 0)
        throw new RangeError(
          "Buffer size must be a multiple of 64-bits"
        );
      for (let t = 0; t < e; t += 8)
        _e(this, t, t + 7), _e(this, t + 1, t + 6), _e(this, t + 2, t + 5), _e(this, t + 3, t + 4);
      return this;
    }, "swap64");
    f.prototype.toString = a(function() {
      let e = this.length;
      return e === 0 ? "" : arguments.length === 0 ? On(
        this,
        0,
        e
      ) : vo.apply(this, arguments);
    }, "toString");
    f.prototype.toLocaleString = f.prototype.toString;
    f.prototype.equals = a(function(e) {
      if (!f.isBuffer(e))
        throw new TypeError(
          "Argument must be a Buffer"
        );
      return this === e ? true : f.compare(this, e) === 0;
    }, "equals");
    f.prototype.inspect = a(function() {
      let e = "", t = Le.INSPECT_MAX_BYTES;
      return e = this.toString(
        "hex",
        0,
        t
      ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
    }, "inspect");
    Bn && (f.prototype[Bn] = f.prototype.inspect);
    f.prototype.compare = a(function(e, t, n, i, s) {
      if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e))
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
      if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length)
        throw new RangeError("out of range index");
      if (i >= s && t >= n)
        return 0;
      if (i >= s)
        return -1;
      if (t >= n)
        return 1;
      if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e)
        return 0;
      let o = s - i, u = n - t, c = Math.min(o, u), h = this.slice(i, s), l = e.slice(t, n);
      for (let y = 0; y < c; ++y)
        if (h[y] !== l[y]) {
          o = h[y], u = l[y];
          break;
        }
      return o < u ? -1 : u < o ? 1 : 0;
    }, "compare");
    function Un(r, e, t, n, i) {
      if (r.length === 0)
        return -1;
      if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, kt(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
        if (i)
          return -1;
        t = r.length - 1;
      } else if (t < 0)
        if (i)
          t = 0;
        else
          return -1;
      if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e))
        return e.length === 0 ? -1 : Ln(r, e, t, n, i);
      if (typeof e == "number")
        return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Ln(
          r,
          [e],
          t,
          n,
          i
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    a(Un, "bidirectionalIndexOf");
    function Ln(r, e, t, n, i) {
      let s = 1, o = r.length, u = e.length;
      if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
        if (r.length < 2 || e.length < 2)
          return -1;
        s = 2, o /= 2, u /= 2, t /= 2;
      }
      function c(l, y) {
        return s === 1 ? l[y] : l.readUInt16BE(y * s);
      }
      a(c, "read");
      let h;
      if (i) {
        let l = -1;
        for (h = t; h < o; h++)
          if (c(r, h) === c(e, l === -1 ? 0 : h - l)) {
            if (l === -1 && (l = h), h - l + 1 === u)
              return l * s;
          } else
            l !== -1 && (h -= h - l), l = -1;
      } else
        for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
          let l = true;
          for (let y = 0; y < u; y++)
            if (c(r, h + y) !== c(e, y)) {
              l = false;
              break;
            }
          if (l)
            return h;
        }
      return -1;
    }
    a(Ln, "arrayIndexOf");
    f.prototype.includes = a(function(e, t, n) {
      return this.indexOf(e, t, n) !== -1;
    }, "includes");
    f.prototype.indexOf = a(function(e, t, n) {
      return Un(this, e, t, n, true);
    }, "indexOf");
    f.prototype.lastIndexOf = a(function(e, t, n) {
      return Un(this, e, t, n, false);
    }, "lastIndexOf");
    function Eo(r, e, t, n) {
      t = Number(t) || 0;
      let i = r.length - t;
      n ? (n = Number(n), n > i && (n = i)) : n = i;
      let s = e.length;
      n > s / 2 && (n = s / 2);
      let o;
      for (o = 0; o < n; ++o) {
        let u = parseInt(e.substr(o * 2, 2), 16);
        if (kt(u))
          return o;
        r[t + o] = u;
      }
      return o;
    }
    a(Eo, "hexWrite");
    function _o(r, e, t, n) {
      return ot(Rt(
        e,
        r.length - t
      ), r, t, n);
    }
    a(_o, "utf8Write");
    function Ao(r, e, t, n) {
      return ot(Uo(e), r, t, n);
    }
    a(Ao, "asciiWrite");
    function Co(r, e, t, n) {
      return ot(Gn(e), r, t, n);
    }
    a(Co, "base64Write");
    function Io(r, e, t, n) {
      return ot(Oo(e, r.length - t), r, t, n);
    }
    a(Io, "ucs2Write");
    f.prototype.write = a(function(e, t, n, i) {
      if (t === void 0)
        i = "utf8", n = this.length, t = 0;
      else if (n === void 0 && typeof t == "string")
        i = t, n = this.length, t = 0;
      else if (isFinite(t))
        t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
      else
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      let s = this.length - t;
      if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length)
        throw new RangeError(
          "Attempt to write outside buffer bounds"
        );
      i || (i = "utf8");
      let o = false;
      for (; ; )
        switch (i) {
          case "hex":
            return Eo(this, e, t, n);
          case "utf8":
          case "utf-8":
            return _o(this, e, t, n);
          case "ascii":
          case "latin1":
          case "binary":
            return Ao(this, e, t, n);
          case "base64":
            return Co(
              this,
              e,
              t,
              n
            );
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Io(this, e, t, n);
          default:
            if (o)
              throw new TypeError("Unknown encoding: " + i);
            i = ("" + i).toLowerCase(), o = true;
        }
    }, "write");
    f.prototype.toJSON = a(function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    }, "toJSON");
    function To(r, e, t) {
      return e === 0 && t === r.length ? Pt.fromByteArray(r) : Pt.fromByteArray(r.slice(e, t));
    }
    a(To, "base64Slice");
    function On(r, e, t) {
      t = Math.min(r.length, t);
      let n = [], i = e;
      for (; i < t; ) {
        let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
        if (i + u <= t) {
          let c, h, l, y;
          switch (u) {
            case 1:
              s < 128 && (o = s);
              break;
            case 2:
              c = r[i + 1], (c & 192) === 128 && (y = (s & 31) << 6 | c & 63, y > 127 && (o = y));
              break;
            case 3:
              c = r[i + 1], h = r[i + 2], (c & 192) === 128 && (h & 192) === 128 && (y = (s & 15) << 12 | (c & 63) << 6 | h & 63, y > 2047 && (y < 55296 || y > 57343) && (o = y));
              break;
            case 4:
              c = r[i + 1], h = r[i + 2], l = r[i + 3], (c & 192) === 128 && (h & 192) === 128 && (l & 192) === 128 && (y = (s & 15) << 18 | (c & 63) << 12 | (h & 63) << 6 | l & 63, y > 65535 && y < 1114112 && (o = y));
          }
        }
        o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
      }
      return Po(n);
    }
    a(On, "utf8Slice");
    var Rn = 4096;
    function Po(r) {
      let e = r.length;
      if (e <= Rn)
        return String.fromCharCode.apply(String, r);
      let t = "", n = 0;
      for (; n < e; )
        t += String.fromCharCode.apply(String, r.slice(n, n += Rn));
      return t;
    }
    a(Po, "decodeCodePointsArray");
    function Bo(r, e, t) {
      let n = "";
      t = Math.min(r.length, t);
      for (let i = e; i < t; ++i)
        n += String.fromCharCode(r[i] & 127);
      return n;
    }
    a(Bo, "asciiSlice");
    function Lo(r, e, t) {
      let n = "";
      t = Math.min(r.length, t);
      for (let i = e; i < t; ++i)
        n += String.fromCharCode(r[i]);
      return n;
    }
    a(Lo, "latin1Slice");
    function Ro(r, e, t) {
      let n = r.length;
      (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
      let i = "";
      for (let s = e; s < t; ++s)
        i += qo[r[s]];
      return i;
    }
    a(Ro, "hexSlice");
    function Fo(r, e, t) {
      let n = r.slice(e, t), i = "";
      for (let s = 0; s < n.length - 1; s += 2)
        i += String.fromCharCode(n[s] + n[s + 1] * 256);
      return i;
    }
    a(Fo, "utf16leSlice");
    f.prototype.slice = a(function(e, t) {
      let n = this.length;
      e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
      let i = this.subarray(
        e,
        t
      );
      return Object.setPrototypeOf(i, f.prototype), i;
    }, "slice");
    function N(r, e, t) {
      if (r % 1 !== 0 || r < 0)
        throw new RangeError("offset is not uint");
      if (r + e > t)
        throw new RangeError(
          "Trying to access beyond buffer length"
        );
    }
    a(N, "checkOffset");
    f.prototype.readUintLE = f.prototype.readUIntLE = a(function(e, t, n) {
      e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
      let i = this[e], s = 1, o = 0;
      for (; ++o < t && (s *= 256); )
        i += this[e + o] * s;
      return i;
    }, "readUIntLE");
    f.prototype.readUintBE = f.prototype.readUIntBE = a(function(e, t, n) {
      e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
      let i = this[e + --t], s = 1;
      for (; t > 0 && (s *= 256); )
        i += this[e + --t] * s;
      return i;
    }, "readUIntBE");
    f.prototype.readUint8 = f.prototype.readUInt8 = a(function(e, t) {
      return e = e >>> 0, t || N(e, 1, this.length), this[e];
    }, "readUInt8");
    f.prototype.readUint16LE = f.prototype.readUInt16LE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 2, this.length), this[e] | this[e + 1] << 8;
    }, "readUInt16LE");
    f.prototype.readUint16BE = f.prototype.readUInt16BE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 2, this.length), this[e] << 8 | this[e + 1];
    }, "readUInt16BE");
    f.prototype.readUint32LE = f.prototype.readUInt32LE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
    }, "readUInt32LE");
    f.prototype.readUint32BE = f.prototype.readUInt32BE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    }, "readUInt32BE");
    f.prototype.readBigUInt64LE = ge(a(function(e) {
      e = e >>> 0, Be(e, "offset");
      let t = this[e], n = this[e + 7];
      (t === void 0 || n === void 0) && je(e, this.length - 8);
      let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
      return BigInt(i) + (BigInt(s) << BigInt(32));
    }, "readBigUInt64LE"));
    f.prototype.readBigUInt64BE = ge(a(function(e) {
      e = e >>> 0, Be(e, "offset");
      let t = this[e], n = this[e + 7];
      (t === void 0 || n === void 0) && je(e, this.length - 8);
      let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
      return (BigInt(
        i
      ) << BigInt(32)) + BigInt(s);
    }, "readBigUInt64BE"));
    f.prototype.readIntLE = a(function(e, t, n) {
      e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
      let i = this[e], s = 1, o = 0;
      for (; ++o < t && (s *= 256); )
        i += this[e + o] * s;
      return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
    }, "readIntLE");
    f.prototype.readIntBE = a(function(e, t, n) {
      e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
      let i = t, s = 1, o = this[e + --i];
      for (; i > 0 && (s *= 256); )
        o += this[e + --i] * s;
      return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
    }, "readIntBE");
    f.prototype.readInt8 = a(function(e, t) {
      return e = e >>> 0, t || N(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
    }, "readInt8");
    f.prototype.readInt16LE = a(function(e, t) {
      e = e >>> 0, t || N(e, 2, this.length);
      let n = this[e] | this[e + 1] << 8;
      return n & 32768 ? n | 4294901760 : n;
    }, "readInt16LE");
    f.prototype.readInt16BE = a(
      function(e, t) {
        e = e >>> 0, t || N(e, 2, this.length);
        let n = this[e + 1] | this[e] << 8;
        return n & 32768 ? n | 4294901760 : n;
      },
      "readInt16BE"
    );
    f.prototype.readInt32LE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
    }, "readInt32LE");
    f.prototype.readInt32BE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
    }, "readInt32BE");
    f.prototype.readBigInt64LE = ge(a(function(e) {
      e = e >>> 0, Be(e, "offset");
      let t = this[e], n = this[e + 7];
      (t === void 0 || n === void 0) && je(
        e,
        this.length - 8
      );
      let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
      return (BigInt(
        i
      ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
    }, "readBigInt64LE"));
    f.prototype.readBigInt64BE = ge(a(function(e) {
      e = e >>> 0, Be(e, "offset");
      let t = this[e], n = this[e + 7];
      (t === void 0 || n === void 0) && je(e, this.length - 8);
      let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
      return (BigInt(i) << BigInt(32)) + BigInt(
        this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
      );
    }, "readBigInt64BE"));
    f.prototype.readFloatLE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), Pe.read(
        this,
        e,
        true,
        23,
        4
      );
    }, "readFloatLE");
    f.prototype.readFloatBE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 4, this.length), Pe.read(this, e, false, 23, 4);
    }, "readFloatBE");
    f.prototype.readDoubleLE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 8, this.length), Pe.read(this, e, true, 52, 8);
    }, "readDoubleLE");
    f.prototype.readDoubleBE = a(function(e, t) {
      return e = e >>> 0, t || N(e, 8, this.length), Pe.read(this, e, false, 52, 8);
    }, "readDoubleBE");
    function z(r, e, t, n, i, s) {
      if (!f.isBuffer(
        r
      ))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (e > i || e < s)
        throw new RangeError('"value" argument is out of bounds');
      if (t + n > r.length)
        throw new RangeError(
          "Index out of range"
        );
    }
    a(z, "checkInt");
    f.prototype.writeUintLE = f.prototype.writeUIntLE = a(function(e, t, n, i) {
      if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
        let u = Math.pow(2, 8 * n) - 1;
        z(
          this,
          e,
          t,
          n,
          u,
          0
        );
      }
      let s = 1, o = 0;
      for (this[t] = e & 255; ++o < n && (s *= 256); )
        this[t + o] = e / s & 255;
      return t + n;
    }, "writeUIntLE");
    f.prototype.writeUintBE = f.prototype.writeUIntBE = a(function(e, t, n, i) {
      if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
        let u = Math.pow(2, 8 * n) - 1;
        z(this, e, t, n, u, 0);
      }
      let s = n - 1, o = 1;
      for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
        this[t + s] = e / o & 255;
      return t + n;
    }, "writeUIntBE");
    f.prototype.writeUint8 = f.prototype.writeUInt8 = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
    }, "writeUInt8");
    f.prototype.writeUint16LE = f.prototype.writeUInt16LE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(
        this,
        e,
        t,
        2,
        65535,
        0
      ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
    }, "writeUInt16LE");
    f.prototype.writeUint16BE = f.prototype.writeUInt16BE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(
        this,
        e,
        t,
        2,
        65535,
        0
      ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
    }, "writeUInt16BE");
    f.prototype.writeUint32LE = f.prototype.writeUInt32LE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(
        this,
        e,
        t,
        4,
        4294967295,
        0
      ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
    }, "writeUInt32LE");
    f.prototype.writeUint32BE = f.prototype.writeUInt32BE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
    }, "writeUInt32BE");
    function qn(r, e, t, n, i) {
      Hn(
        e,
        n,
        i,
        r,
        t,
        7
      );
      let s = Number(e & BigInt(4294967295));
      r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
      let o = Number(e >> BigInt(32) & BigInt(4294967295));
      return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
    }
    a(qn, "wrtBigUInt64LE");
    function Nn(r, e, t, n, i) {
      Hn(e, n, i, r, t, 7);
      let s = Number(e & BigInt(4294967295));
      r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
      let o = Number(e >> BigInt(32) & BigInt(4294967295));
      return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
    }
    a(Nn, "wrtBigUInt64BE");
    f.prototype.writeBigUInt64LE = ge(a(function(e, t = 0) {
      return qn(this, e, t, BigInt(0), BigInt(
        "0xffffffffffffffff"
      ));
    }, "writeBigUInt64LE"));
    f.prototype.writeBigUInt64BE = ge(a(function(e, t = 0) {
      return Nn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64BE"));
    f.prototype.writeIntLE = a(function(e, t, n, i) {
      if (e = +e, t = t >>> 0, !i) {
        let c = Math.pow(
          2,
          8 * n - 1
        );
        z(this, e, t, n, c - 1, -c);
      }
      let s = 0, o = 1, u = 0;
      for (this[t] = e & 255; ++s < n && (o *= 256); )
        e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
      return t + n;
    }, "writeIntLE");
    f.prototype.writeIntBE = a(function(e, t, n, i) {
      if (e = +e, t = t >>> 0, !i) {
        let c = Math.pow(
          2,
          8 * n - 1
        );
        z(this, e, t, n, c - 1, -c);
      }
      let s = n - 1, o = 1, u = 0;
      for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
        e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
      return t + n;
    }, "writeIntBE");
    f.prototype.writeInt8 = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(
        this,
        e,
        t,
        1,
        127,
        -128
      ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
    }, "writeInt8");
    f.prototype.writeInt16LE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
    }, "writeInt16LE");
    f.prototype.writeInt16BE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
    }, "writeInt16BE");
    f.prototype.writeInt32LE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
    }, "writeInt32LE");
    f.prototype.writeInt32BE = a(function(e, t, n) {
      return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
    }, "writeInt32BE");
    f.prototype.writeBigInt64LE = ge(a(function(e, t = 0) {
      return qn(this, e, t, -BigInt(
        "0x8000000000000000"
      ), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64LE"));
    f.prototype.writeBigInt64BE = ge(a(function(e, t = 0) {
      return Nn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE"));
    function Qn(r, e, t, n, i, s) {
      if (t + n > r.length)
        throw new RangeError("Index out of range");
      if (t < 0)
        throw new RangeError(
          "Index out of range"
        );
    }
    a(Qn, "checkIEEE754");
    function Wn(r, e, t, n, i) {
      return e = +e, t = t >>> 0, i || Qn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(
        r,
        e,
        t,
        n,
        23,
        4
      ), t + 4;
    }
    a(Wn, "writeFloat");
    f.prototype.writeFloatLE = a(function(e, t, n) {
      return Wn(
        this,
        e,
        t,
        true,
        n
      );
    }, "writeFloatLE");
    f.prototype.writeFloatBE = a(function(e, t, n) {
      return Wn(
        this,
        e,
        t,
        false,
        n
      );
    }, "writeFloatBE");
    function jn(r, e, t, n, i) {
      return e = +e, t = t >>> 0, i || Qn(
        r,
        e,
        t,
        8,
        17976931348623157e292,
        -17976931348623157e292
      ), Pe.write(r, e, t, n, 52, 8), t + 8;
    }
    a(jn, "writeDouble");
    f.prototype.writeDoubleLE = a(function(e, t, n) {
      return jn(
        this,
        e,
        t,
        true,
        n
      );
    }, "writeDoubleLE");
    f.prototype.writeDoubleBE = a(function(e, t, n) {
      return jn(
        this,
        e,
        t,
        false,
        n
      );
    }, "writeDoubleBE");
    f.prototype.copy = a(function(e, t, n, i) {
      if (!f.isBuffer(
        e
      ))
        throw new TypeError("argument should be a Buffer");
      if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0)
        return 0;
      if (t < 0)
        throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length)
        throw new RangeError("Index out of range");
      if (i < 0)
        throw new RangeError(
          "sourceEnd out of bounds"
        );
      i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
      let s = i - n;
      return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
    }, "copy");
    f.prototype.fill = a(function(e, t, n, i) {
      if (typeof e == "string") {
        if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !f.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (e.length === 1) {
          let o = e.charCodeAt(0);
          (i === "utf8" && o < 128 || i === "latin1") && (e = o);
        }
      } else
        typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
      if (t < 0 || this.length < t || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= t)
        return this;
      t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
      let s;
      if (typeof e == "number")
        for (s = t; s < n; ++s)
          this[s] = e;
      else {
        let o = f.isBuffer(e) ? e : f.from(e, i), u = o.length;
        if (u === 0)
          throw new TypeError(
            'The value "' + e + '" is invalid for argument "value"'
          );
        for (s = 0; s < n - t; ++s)
          this[s + t] = o[s % u];
      }
      return this;
    }, "fill");
    var Te = {};
    function Dt(r, e, t) {
      var n;
      Te[r] = (n = class extends t {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: e.apply(this, arguments),
            writable: true,
            configurable: true
          }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
        }
        get code() {
          return r;
        }
        set code(s) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value: s,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${r}]: ${this.message}`;
        }
      }, a(n, "NodeError"), n);
    }
    a(Dt, "E");
    Dt("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
      return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError);
    Dt("ERR_INVALID_ARG_TYPE", function(r, e) {
      return `The "${r}" argument must be of type number. Received type ${typeof e}`;
    }, TypeError);
    Dt("ERR_OUT_OF_RANGE", function(r, e, t) {
      let n = `The value of "${r}" is out of range.`, i = t;
      return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Fn(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Fn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
    }, RangeError);
    function Fn(r) {
      let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
      for (; t >= n + 4; t -= 3)
        e = `_${r.slice(t - 3, t)}${e}`;
      return `${r.slice(
        0,
        t
      )}${e}`;
    }
    a(Fn, "addNumericalSeparator");
    function Mo(r, e, t) {
      Be(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && je(e, r.length - (t + 1));
    }
    a(Mo, "checkBounds");
    function Hn(r, e, t, n, i, s) {
      if (r > t || r < e) {
        let o = typeof e == "bigint" ? "n" : "", u;
        throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Te.ERR_OUT_OF_RANGE(
          "value",
          u,
          r
        );
      }
      Mo(n, i, s);
    }
    a(Hn, "checkIntBI");
    function Be(r, e) {
      if (typeof r != "number")
        throw new Te.ERR_INVALID_ARG_TYPE(e, "number", r);
    }
    a(Be, "validateNumber");
    function je(r, e, t) {
      throw Math.floor(r) !== r ? (Be(r, t), new Te.ERR_OUT_OF_RANGE(
        t || "offset",
        "an integer",
        r
      )) : e < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
    }
    a(je, "boundsError");
    var Do = /[^+/0-9A-Za-z-_]/g;
    function ko(r) {
      if (r = r.split("=")[0], r = r.trim().replace(Do, ""), r.length < 2)
        return "";
      for (; r.length % 4 !== 0; )
        r = r + "=";
      return r;
    }
    a(ko, "base64clean");
    function Rt(r, e) {
      e = e || 1 / 0;
      let t, n = r.length, i = null, s = [];
      for (let o = 0; o < n; ++o) {
        if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
          if (!i) {
            if (t > 56319) {
              (e -= 3) > -1 && s.push(239, 191, 189);
              continue;
            } else if (o + 1 === n) {
              (e -= 3) > -1 && s.push(239, 191, 189);
              continue;
            }
            i = t;
            continue;
          }
          if (t < 56320) {
            (e -= 3) > -1 && s.push(
              239,
              191,
              189
            ), i = t;
            continue;
          }
          t = (i - 55296 << 10 | t - 56320) + 65536;
        } else
          i && (e -= 3) > -1 && s.push(
            239,
            191,
            189
          );
        if (i = null, t < 128) {
          if ((e -= 1) < 0)
            break;
          s.push(t);
        } else if (t < 2048) {
          if ((e -= 2) < 0)
            break;
          s.push(t >> 6 | 192, t & 63 | 128);
        } else if (t < 65536) {
          if ((e -= 3) < 0)
            break;
          s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
        } else if (t < 1114112) {
          if ((e -= 4) < 0)
            break;
          s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
        } else
          throw new Error("Invalid code point");
      }
      return s;
    }
    a(
      Rt,
      "utf8ToBytes"
    );
    function Uo(r) {
      let e = [];
      for (let t = 0; t < r.length; ++t)
        e.push(r.charCodeAt(
          t
        ) & 255);
      return e;
    }
    a(Uo, "asciiToBytes");
    function Oo(r, e) {
      let t, n, i, s = [];
      for (let o = 0; o < r.length && !((e -= 2) < 0); ++o)
        t = r.charCodeAt(o), n = t >> 8, i = t % 256, s.push(i), s.push(n);
      return s;
    }
    a(Oo, "utf16leToBytes");
    function Gn(r) {
      return Pt.toByteArray(ko(r));
    }
    a(Gn, "base64ToBytes");
    function ot(r, e, t, n) {
      let i;
      for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
        e[i + t] = r[i];
      return i;
    }
    a(ot, "blitBuffer");
    function ue(r, e) {
      return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
    }
    a(ue, "isInstance");
    function kt(r) {
      return r !== r;
    }
    a(kt, "numberIsNaN");
    var qo = function() {
      let r = "0123456789abcdef", e = new Array(256);
      for (let t = 0; t < 16; ++t) {
        let n = t * 16;
        for (let i = 0; i < 16; ++i)
          e[n + i] = r[t] + r[i];
      }
      return e;
    }();
    function ge(r) {
      return typeof BigInt > "u" ? No : r;
    }
    a(ge, "defineBigIntMethod");
    function No() {
      throw new Error("BigInt not supported");
    }
    a(No, "BufferBigIntNotDefined");
  });
  var b;
  var S;
  var v;
  var g;
  var d;
  var m;
  var p = $(() => {
    "use strict";
    b = globalThis, S = globalThis.setImmediate ?? ((r) => setTimeout(
      r,
      0
    )), v = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), g = globalThis.crypto ?? {};
    g.subtle ?? (g.subtle = {});
    d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : $n().Buffer, m = globalThis.process ?? {};
    m.env ?? (m.env = {});
    try {
      m.nextTick(() => {
      });
    } catch {
      let e = Promise.resolve();
      m.nextTick = e.then.bind(e);
    }
  });
  var we = I((rh, Ut) => {
    "use strict";
    p();
    var Re = typeof Reflect == "object" ? Reflect : null, Vn = Re && typeof Re.apply == "function" ? Re.apply : a(function(e, t, n) {
      return Function.prototype.apply.call(e, t, n);
    }, "ReflectApply"), at;
    Re && typeof Re.ownKeys == "function" ? at = Re.ownKeys : Object.getOwnPropertySymbols ? at = a(function(e) {
      return Object.getOwnPropertyNames(
        e
      ).concat(Object.getOwnPropertySymbols(e));
    }, "ReflectOwnKeys") : at = a(function(e) {
      return Object.getOwnPropertyNames(e);
    }, "ReflectOwnKeys");
    function Qo(r) {
      console && console.warn && console.warn(r);
    }
    a(Qo, "ProcessEmitWarning");
    var zn = Number.isNaN || a(function(e) {
      return e !== e;
    }, "NumberIsNaN");
    function L() {
      L.init.call(this);
    }
    a(L, "EventEmitter");
    Ut.exports = L;
    Ut.exports.once = Go;
    L.EventEmitter = L;
    L.prototype._events = void 0;
    L.prototype._eventsCount = 0;
    L.prototype._maxListeners = void 0;
    var Kn = 10;
    function ut(r) {
      if (typeof r != "function")
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
    }
    a(ut, "checkListener");
    Object.defineProperty(L, "defaultMaxListeners", { enumerable: true, get: function() {
      return Kn;
    }, set: function(r) {
      if (typeof r != "number" || r < 0 || zn(r))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
      Kn = r;
    } });
    L.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    };
    L.prototype.setMaxListeners = a(function(e) {
      if (typeof e != "number" || e < 0 || zn(
        e
      ))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
      return this._maxListeners = e, this;
    }, "setMaxListeners");
    function Yn(r) {
      return r._maxListeners === void 0 ? L.defaultMaxListeners : r._maxListeners;
    }
    a(Yn, "_getMaxListeners");
    L.prototype.getMaxListeners = a(
      function() {
        return Yn(this);
      },
      "getMaxListeners"
    );
    L.prototype.emit = a(function(e) {
      for (var t = [], n = 1; n < arguments.length; n++)
        t.push(arguments[n]);
      var i = e === "error", s = this._events;
      if (s !== void 0)
        i = i && s.error === void 0;
      else if (!i)
        return false;
      if (i) {
        var o;
        if (t.length > 0 && (o = t[0]), o instanceof Error)
          throw o;
        var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
        throw u.context = o, u;
      }
      var c = s[e];
      if (c === void 0)
        return false;
      if (typeof c == "function")
        Vn(c, this, t);
      else
        for (var h = c.length, l = ti(c, h), n = 0; n < h; ++n)
          Vn(l[n], this, t);
      return true;
    }, "emit");
    function Zn(r, e, t, n) {
      var i, s, o;
      if (ut(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit("newListener", e, t.listener ? t.listener : t), s = r._events), o = s[e]), o === void 0)
        o = s[e] = t, ++r._eventsCount;
      else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = Yn(r), i > 0 && o.length > i && !o.warned) {
        o.warned = true;
        var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, Qo(u);
      }
      return r;
    }
    a(Zn, "_addListener");
    L.prototype.addListener = a(function(e, t) {
      return Zn(
        this,
        e,
        t,
        false
      );
    }, "addListener");
    L.prototype.on = L.prototype.addListener;
    L.prototype.prependListener = a(function(e, t) {
      return Zn(this, e, t, true);
    }, "prependListener");
    function Wo() {
      if (!this.fired)
        return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }
    a(Wo, "onceWrapper");
    function Jn(r, e, t) {
      var n = {
        fired: false,
        wrapFn: void 0,
        target: r,
        type: e,
        listener: t
      }, i = Wo.bind(n);
      return i.listener = t, n.wrapFn = i, i;
    }
    a(Jn, "_onceWrap");
    L.prototype.once = a(function(e, t) {
      return ut(t), this.on(e, Jn(this, e, t)), this;
    }, "once");
    L.prototype.prependOnceListener = a(function(e, t) {
      return ut(t), this.prependListener(e, Jn(this, e, t)), this;
    }, "prependOnceListener");
    L.prototype.removeListener = a(function(e, t) {
      var n, i, s, o, u;
      if (ut(t), i = this._events, i === void 0)
        return this;
      if (n = i[e], n === void 0)
        return this;
      if (n === t || n.listener === t)
        --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
      else if (typeof n != "function") {
        for (s = -1, o = n.length - 1; o >= 0; o--)
          if (n[o] === t || n[o].listener === t) {
            u = n[o].listener, s = o;
            break;
          }
        if (s < 0)
          return this;
        s === 0 ? n.shift() : jo(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit(
          "removeListener",
          e,
          u || t
        );
      }
      return this;
    }, "removeListener");
    L.prototype.off = L.prototype.removeListener;
    L.prototype.removeAllListeners = a(function(e) {
      var t, n, i;
      if (n = this._events, n === void 0)
        return this;
      if (n.removeListener === void 0)
        return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
      if (arguments.length === 0) {
        var s = Object.keys(n), o;
        for (i = 0; i < s.length; ++i)
          o = s[i], o !== "removeListener" && this.removeAllListeners(o);
        return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
      }
      if (t = n[e], typeof t == "function")
        this.removeListener(e, t);
      else if (t !== void 0)
        for (i = t.length - 1; i >= 0; i--)
          this.removeListener(e, t[i]);
      return this;
    }, "removeAllListeners");
    function Xn(r, e, t) {
      var n = r._events;
      if (n === void 0)
        return [];
      var i = n[e];
      return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? Ho(i) : ti(i, i.length);
    }
    a(Xn, "_listeners");
    L.prototype.listeners = a(function(e) {
      return Xn(this, e, true);
    }, "listeners");
    L.prototype.rawListeners = a(function(e) {
      return Xn(this, e, false);
    }, "rawListeners");
    L.listenerCount = function(r, e) {
      return typeof r.listenerCount == "function" ? r.listenerCount(e) : ei.call(r, e);
    };
    L.prototype.listenerCount = ei;
    function ei(r) {
      var e = this._events;
      if (e !== void 0) {
        var t = e[r];
        if (typeof t == "function")
          return 1;
        if (t !== void 0)
          return t.length;
      }
      return 0;
    }
    a(ei, "listenerCount");
    L.prototype.eventNames = a(function() {
      return this._eventsCount > 0 ? at(this._events) : [];
    }, "eventNames");
    function ti(r, e) {
      for (var t = new Array(e), n = 0; n < e; ++n)
        t[n] = r[n];
      return t;
    }
    a(ti, "arrayClone");
    function jo(r, e) {
      for (; e + 1 < r.length; e++)
        r[e] = r[e + 1];
      r.pop();
    }
    a(jo, "spliceOne");
    function Ho(r) {
      for (var e = new Array(r.length), t = 0; t < e.length; ++t)
        e[t] = r[t].listener || r[t];
      return e;
    }
    a(Ho, "unwrapListeners");
    function Go(r, e) {
      return new Promise(
        function(t, n) {
          function i(o) {
            r.removeListener(e, s), n(o);
          }
          a(i, "errorListener");
          function s() {
            typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
              arguments
            ));
          }
          a(s, "resolver"), ri(r, e, s, { once: true }), e !== "error" && $o(r, i, { once: true });
        }
      );
    }
    a(Go, "once");
    function $o(r, e, t) {
      typeof r.on == "function" && ri(r, "error", e, t);
    }
    a(
      $o,
      "addErrorHandlerIfEventEmitter"
    );
    function ri(r, e, t, n) {
      if (typeof r.on == "function")
        n.once ? r.once(e, t) : r.on(e, t);
      else if (typeof r.addEventListener == "function")
        r.addEventListener(
          e,
          a(function i(s) {
            n.once && r.removeEventListener(e, i), t(s);
          }, "wrapListener")
        );
      else
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
    }
    a(ri, "eventTargetAgnosticAddListener");
  });
  var He = {};
  te(He, { default: () => Vo });
  var Vo;
  var Ge = $(() => {
    "use strict";
    p();
    Vo = {};
  });
  function $e(r) {
    let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, h = 0, l = 0, y = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ], x = a(
      (_, w) => _ >>> w | _ << 32 - w,
      "rrot"
    ), A = new Uint32Array(64), B = new Uint8Array(64), W = a(() => {
      for (let R = 0, G = 0; R < 16; R++, G += 4)
        A[R] = B[G] << 24 | B[G + 1] << 16 | B[G + 2] << 8 | B[G + 3];
      for (let R = 16; R < 64; R++) {
        let G = x(A[R - 15], 7) ^ x(A[R - 15], 18) ^ A[R - 15] >>> 3, he = x(A[R - 2], 17) ^ x(A[R - 2], 19) ^ A[R - 2] >>> 10;
        A[R] = A[R - 16] + G + A[R - 7] + he | 0;
      }
      let _ = e, w = t, P = n, K = i, k = s, j = o, ce = u, ee = c;
      for (let R = 0; R < 64; R++) {
        let G = x(
          k,
          6
        ) ^ x(k, 11) ^ x(k, 25), he = k & j ^ ~k & ce, ye = ee + G + he + y[R] + A[R] | 0, ve = x(_, 2) ^ x(_, 13) ^ x(_, 22), me = _ & w ^ _ & P ^ w & P, se = ve + me | 0;
        ee = ce, ce = j, j = k, k = K + ye | 0, K = P, P = w, w = _, _ = ye + se | 0;
      }
      e = e + _ | 0, t = t + w | 0, n = n + P | 0, i = i + K | 0, s = s + k | 0, o = o + j | 0, u = u + ce | 0, c = c + ee | 0, l = 0;
    }, "process"), J = a((_) => {
      typeof _ == "string" && (_ = new TextEncoder().encode(_));
      for (let w = 0; w < _.length; w++)
        B[l++] = _[w], l === 64 && W();
      h += _.length;
    }, "add"), de = a(() => {
      if (B[l++] = 128, l == 64 && W(), l + 8 > 64) {
        for (; l < 64; )
          B[l++] = 0;
        W();
      }
      for (; l < 58; )
        B[l++] = 0;
      let _ = h * 8;
      B[l++] = _ / 1099511627776 & 255, B[l++] = _ / 4294967296 & 255, B[l++] = _ >>> 24, B[l++] = _ >>> 16 & 255, B[l++] = _ >>> 8 & 255, B[l++] = _ & 255, W();
      let w = new Uint8Array(32);
      return w[0] = e >>> 24, w[1] = e >>> 16 & 255, w[2] = e >>> 8 & 255, w[3] = e & 255, w[4] = t >>> 24, w[5] = t >>> 16 & 255, w[6] = t >>> 8 & 255, w[7] = t & 255, w[8] = n >>> 24, w[9] = n >>> 16 & 255, w[10] = n >>> 8 & 255, w[11] = n & 255, w[12] = i >>> 24, w[13] = i >>> 16 & 255, w[14] = i >>> 8 & 255, w[15] = i & 255, w[16] = s >>> 24, w[17] = s >>> 16 & 255, w[18] = s >>> 8 & 255, w[19] = s & 255, w[20] = o >>> 24, w[21] = o >>> 16 & 255, w[22] = o >>> 8 & 255, w[23] = o & 255, w[24] = u >>> 24, w[25] = u >>> 16 & 255, w[26] = u >>> 8 & 255, w[27] = u & 255, w[28] = c >>> 24, w[29] = c >>> 16 & 255, w[30] = c >>> 8 & 255, w[31] = c & 255, w;
    }, "digest");
    return r === void 0 ? { add: J, digest: de } : (J(r), de());
  }
  var ni = $(
    () => {
      "use strict";
      p();
      a($e, "sha256");
    }
  );
  var U;
  var Ve;
  var ii = $(() => {
    "use strict";
    p();
    U = class U2 {
      constructor() {
        T(
          this,
          "_dataLength",
          0
        );
        T(this, "_bufferLength", 0);
        T(this, "_state", new Int32Array(4));
        T(
          this,
          "_buffer",
          new ArrayBuffer(68)
        );
        T(this, "_buffer8");
        T(this, "_buffer32");
        this._buffer8 = new Uint8Array(
          this._buffer,
          0,
          68
        ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
      }
      static hashByteArray(e, t = false) {
        return this.onePassHasher.start().appendByteArray(e).end(t);
      }
      static hashStr(e, t = false) {
        return this.onePassHasher.start().appendStr(e).end(t);
      }
      static hashAsciiStr(e, t = false) {
        return this.onePassHasher.start().appendAsciiStr(e).end(t);
      }
      static _hex(e) {
        let t = U2.hexChars, n = U2.hexOut, i, s, o, u;
        for (u = 0; u < 4; u += 1)
          for (s = u * 8, i = e[u], o = 0; o < 8; o += 2)
            n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(i & 15), i >>>= 4;
        return n.join("");
      }
      static _md5cycle(e, t) {
        let n = e[0], i = e[1], s = e[2], o = e[3];
        n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
      }
      start() {
        return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
      }
      appendStr(e) {
        let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
        for (o = 0; o < e.length; o += 1) {
          if (s = e.charCodeAt(o), s < 128)
            t[i++] = s;
          else if (s < 2048)
            t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
          else if (s < 55296 || s > 56319)
            t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
          else {
            if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111)
              throw new Error("Unicode standard supports code points up to U+10FFFF");
            t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
          }
          i >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
        }
        return this._bufferLength = i, this;
      }
      appendAsciiStr(e) {
        let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
        for (; ; ) {
          for (s = Math.min(e.length - o, 64 - i); s--; )
            t[i++] = e.charCodeAt(o++);
          if (i < 64)
            break;
          this._dataLength += 64, U2._md5cycle(
            this._state,
            n
          ), i = 0;
        }
        return this._bufferLength = i, this;
      }
      appendByteArray(e) {
        let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
        for (; ; ) {
          for (s = Math.min(e.length - o, 64 - i); s--; )
            t[i++] = e[o++];
          if (i < 64)
            break;
          this._dataLength += 64, U2._md5cycle(
            this._state,
            n
          ), i = 0;
        }
        return this._bufferLength = i, this;
      }
      getState() {
        let e = this._state;
        return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
      }
      setState(e) {
        let t = e.buffer, n = e.state, i = this._state, s;
        for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1)
          this._buffer8[s] = t.charCodeAt(s);
      }
      end(e = false) {
        let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
        this._dataLength += t;
        let o = this._dataLength * 8;
        if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(U2.buffer32Identity.subarray(s), s), t > 55 && (U2._md5cycle(this._state, i), i.set(U2.buffer32Identity)), o <= 4294967295)
          i[14] = o;
        else {
          let u = o.toString(16).match(/(.*?)(.{0,8})$/);
          if (u === null)
            return;
          let c = parseInt(
            u[2],
            16
          ), h = parseInt(u[1], 16) || 0;
          i[14] = c, i[15] = h;
        }
        return U2._md5cycle(this._state, i), e ? this._state : U2._hex(this._state);
      }
    };
    a(U, "Md5"), T(U, "stateIdentity", new Int32Array(
      [1732584193, -271733879, -1732584194, 271733878]
    )), T(U, "buffer32Identity", new Int32Array(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    )), T(U, "hexChars", "0123456789abcdef"), T(U, "hexOut", []), T(U, "onePassHasher", new U());
    Ve = U;
  });
  var Ot = {};
  te(Ot, { createHash: () => zo, createHmac: () => Yo, randomBytes: () => Ko });
  function Ko(r) {
    return g.getRandomValues(d.alloc(r));
  }
  function zo(r) {
    if (r === "sha256")
      return { update: function(e) {
        return { digest: function() {
          return d.from($e(e));
        } };
      } };
    if (r === "md5")
      return { update: function(e) {
        return { digest: function() {
          return typeof e == "string" ? Ve.hashStr(e) : Ve.hashByteArray(
            e
          );
        } };
      } };
    throw new Error(`Hash type '${r}' not supported`);
  }
  function Yo(r, e) {
    if (r !== "sha256")
      throw new Error(`Only sha256 is supported (requested: '${r}')`);
    return {
      update: function(t) {
        return { digest: function() {
          typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
          let n = e.length;
          if (n > 64)
            e = $e(e);
          else if (n < 64) {
            let c = new Uint8Array(64);
            c.set(e), e = c;
          }
          let i = new Uint8Array(
            64
          ), s = new Uint8Array(64);
          for (let c = 0; c < 64; c++)
            i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
          let o = new Uint8Array(
            t.length + 64
          );
          o.set(i, 0), o.set(t, 64);
          let u = new Uint8Array(96);
          return u.set(s, 0), u.set($e(o), 64), d.from($e(u));
        } };
      }
    };
  }
  var qt = $(() => {
    "use strict";
    p();
    ni();
    ii();
    a(Ko, "randomBytes");
    a(zo, "createHash");
    a(Yo, "createHmac");
  });
  var Qt = I((si) => {
    "use strict";
    p();
    si.parse = function(r, e) {
      return new Nt(r, e).parse();
    };
    var ct = class ct2 {
      constructor(e, t) {
        this.source = e, this.transform = t || Zo, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var e = this.source[this.position++];
        return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
      }
      record(e) {
        this.recorded.push(e);
      }
      newEntry(e) {
        var t;
        (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
          t
        ), this.recorded = []);
      }
      consumeDimensions() {
        if (this.source[0] === "[")
          for (; !this.isEof(); ) {
            var e = this.nextCharacter();
            if (e.value === "=")
              break;
          }
      }
      parse(e) {
        var t, n, i;
        for (this.consumeDimensions(); !this.isEof(); )
          if (t = this.nextCharacter(), t.value === "{" && !i)
            this.dimension++, this.dimension > 1 && (n = new ct2(this.source.substr(this.position - 1), this.transform), this.entries.push(
              n.parse(true)
            ), this.position += n.position - 2);
          else if (t.value === "}" && !i) {
            if (this.dimension--, !this.dimension && (this.newEntry(), e))
              return this.entries;
          } else
            t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
              t.value
            );
        if (this.dimension !== 0)
          throw new Error("array dimension not balanced");
        return this.entries;
      }
    };
    a(ct, "ArrayParser");
    var Nt = ct;
    function Zo(r) {
      return r;
    }
    a(Zo, "identity");
  });
  var Wt = I((bh, oi) => {
    p();
    var Jo = Qt();
    oi.exports = { create: function(r, e) {
      return { parse: function() {
        return Jo.parse(r, e);
      } };
    } };
  });
  var ci = I((xh, ui) => {
    "use strict";
    p();
    var Xo = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, ea = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, ta = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, ra = /^-?infinity$/;
    ui.exports = a(function(e) {
      if (ra.test(e))
        return Number(e.replace("i", "I"));
      var t = Xo.exec(e);
      if (!t)
        return na(e) || null;
      var n = !!t[8], i = parseInt(t[1], 10);
      n && (i = ai(i));
      var s = parseInt(
        t[2],
        10
      ) - 1, o = t[3], u = parseInt(t[4], 10), c = parseInt(t[5], 10), h = parseInt(t[6], 10), l = t[7];
      l = l ? 1e3 * parseFloat(l) : 0;
      var y, x = ia(e);
      return x != null ? (y = new Date(Date.UTC(
        i,
        s,
        o,
        u,
        c,
        h,
        l
      )), jt(i) && y.setUTCFullYear(i), x !== 0 && y.setTime(y.getTime() - x)) : (y = new Date(
        i,
        s,
        o,
        u,
        c,
        h,
        l
      ), jt(i) && y.setFullYear(i)), y;
    }, "parseDate");
    function na(r) {
      var e = ea.exec(r);
      if (e) {
        var t = parseInt(e[1], 10), n = !!e[4];
        n && (t = ai(t));
        var i = parseInt(
          e[2],
          10
        ) - 1, s = e[3], o = new Date(t, i, s);
        return jt(t) && o.setFullYear(t), o;
      }
    }
    a(na, "getDate");
    function ia(r) {
      if (r.endsWith("+00"))
        return 0;
      var e = ta.exec(r.split(" ")[1]);
      if (e) {
        var t = e[1];
        if (t === "Z")
          return 0;
        var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
          e[3] || 0,
          10
        ) * 60 + parseInt(e[4] || 0, 10);
        return i * n * 1e3;
      }
    }
    a(ia, "timeZoneOffset");
    function ai(r) {
      return -(r - 1);
    }
    a(ai, "bcYearToNegativeYear");
    function jt(r) {
      return r >= 0 && r < 100;
    }
    a(
      jt,
      "is0To99"
    );
  });
  var li = I((_h, hi) => {
    p();
    hi.exports = oa;
    var sa = Object.prototype.hasOwnProperty;
    function oa(r) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t)
          sa.call(
            t,
            n
          ) && (r[n] = t[n]);
      }
      return r;
    }
    a(oa, "extend");
  });
  var di = I((Ih, pi) => {
    "use strict";
    p();
    var aa = li();
    pi.exports = Fe;
    function Fe(r) {
      if (!(this instanceof Fe))
        return new Fe(r);
      aa(this, ba(r));
    }
    a(Fe, "PostgresInterval");
    var ua = ["seconds", "minutes", "hours", "days", "months", "years"];
    Fe.prototype.toPostgres = function() {
      var r = ua.filter(this.hasOwnProperty, this);
      return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
        var t = this[e] || 0;
        return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
          /\.?0+$/,
          ""
        )), t + " " + e;
      }, this).join(" ");
    };
    var ca = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, ha = ["years", "months", "days"], la = ["hours", "minutes", "seconds"];
    Fe.prototype.toISOString = Fe.prototype.toISO = function() {
      var r = ha.map(t, this).join(""), e = la.map(t, this).join("");
      return "P" + r + "T" + e;
      function t(n) {
        var i = this[n] || 0;
        return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
          /0+$/,
          ""
        )), i + ca[n];
      }
    };
    var Ht = "([+-]?\\d+)", fa = Ht + "\\s+years?", pa = Ht + "\\s+mons?", da = Ht + "\\s+days?", ya = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", ma = new RegExp([
      fa,
      pa,
      da,
      ya
    ].map(function(r) {
      return "(" + r + ")?";
    }).join("\\s*")), fi = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    }, ga = ["hours", "minutes", "seconds", "milliseconds"];
    function wa(r) {
      var e = r + "000000".slice(r.length);
      return parseInt(
        e,
        10
      ) / 1e3;
    }
    a(wa, "parseMilliseconds");
    function ba(r) {
      if (!r)
        return {};
      var e = ma.exec(
        r
      ), t = e[8] === "-";
      return Object.keys(fi).reduce(function(n, i) {
        var s = fi[i], o = e[s];
        return !o || (o = i === "milliseconds" ? wa(o) : parseInt(o, 10), !o) || (t && ~ga.indexOf(i) && (o *= -1), n[i] = o), n;
      }, {});
    }
    a(ba, "parse");
  });
  var mi = I((Bh, yi) => {
    "use strict";
    p();
    yi.exports = a(function(e) {
      if (/^\\x/.test(e))
        return new d(
          e.substr(2),
          "hex"
        );
      for (var t = "", n = 0; n < e.length; )
        if (e[n] !== "\\")
          t += e[n], ++n;
        else if (/[0-7]{3}/.test(e.substr(n + 1, 3)))
          t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
        else {
          for (var i = 1; n + i < e.length && e[n + i] === "\\"; )
            i++;
          for (var s = 0; s < Math.floor(i / 2); ++s)
            t += "\\";
          n += Math.floor(i / 2) * 2;
        }
      return new d(t, "binary");
    }, "parseBytea");
  });
  var Ei = I((Fh, vi) => {
    p();
    var Ke = Qt(), ze = Wt(), ht = ci(), wi = di(), bi = mi();
    function lt(r) {
      return a(function(t) {
        return t === null ? t : r(t);
      }, "nullAllowed");
    }
    a(lt, "allowNull");
    function Si(r) {
      return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
    }
    a(Si, "parseBool");
    function Sa(r) {
      return r ? Ke.parse(r, Si) : null;
    }
    a(Sa, "parseBoolArray");
    function xa(r) {
      return parseInt(r, 10);
    }
    a(xa, "parseBaseTenInt");
    function Gt(r) {
      return r ? Ke.parse(r, lt(xa)) : null;
    }
    a(Gt, "parseIntegerArray");
    function va(r) {
      return r ? Ke.parse(r, lt(function(e) {
        return xi(e).trim();
      })) : null;
    }
    a(va, "parseBigIntegerArray");
    var Ea = a(function(r) {
      if (!r)
        return null;
      var e = ze.create(r, function(t) {
        return t !== null && (t = zt(t)), t;
      });
      return e.parse();
    }, "parsePointArray"), $t = a(function(r) {
      if (!r)
        return null;
      var e = ze.create(r, function(t) {
        return t !== null && (t = parseFloat(t)), t;
      });
      return e.parse();
    }, "parseFloatArray"), ne = a(function(r) {
      if (!r)
        return null;
      var e = ze.create(r);
      return e.parse();
    }, "parseStringArray"), Vt = a(function(r) {
      if (!r)
        return null;
      var e = ze.create(r, function(t) {
        return t !== null && (t = ht(t)), t;
      });
      return e.parse();
    }, "parseDateArray"), _a = a(function(r) {
      if (!r)
        return null;
      var e = ze.create(r, function(t) {
        return t !== null && (t = wi(t)), t;
      });
      return e.parse();
    }, "parseIntervalArray"), Aa = a(function(r) {
      return r ? Ke.parse(r, lt(bi)) : null;
    }, "parseByteAArray"), Kt = a(function(r) {
      return parseInt(
        r,
        10
      );
    }, "parseInteger"), xi = a(function(r) {
      var e = String(r);
      return /^\d+$/.test(e) ? e : r;
    }, "parseBigInteger"), gi = a(
      function(r) {
        return r ? Ke.parse(r, lt(JSON.parse)) : null;
      },
      "parseJsonArray"
    ), zt = a(function(r) {
      return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
    }, "parsePoint"), Ca = a(function(r) {
      if (r[0] !== "<" && r[1] !== "(")
        return null;
      for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
        if (n || (e += r[i]), r[i] === ")") {
          n = true;
          continue;
        } else if (!n)
          continue;
        r[i] !== "," && (t += r[i]);
      }
      var s = zt(e);
      return s.radius = parseFloat(t), s;
    }, "parseCircle"), Ia = a(function(r) {
      r(
        20,
        xi
      ), r(21, Kt), r(23, Kt), r(26, Kt), r(700, parseFloat), r(701, parseFloat), r(16, Si), r(
        1082,
        ht
      ), r(1114, ht), r(1184, ht), r(600, zt), r(651, ne), r(718, Ca), r(1e3, Sa), r(1001, Aa), r(
        1005,
        Gt
      ), r(1007, Gt), r(1028, Gt), r(1016, va), r(1017, Ea), r(1021, $t), r(1022, $t), r(1231, $t), r(1014, ne), r(1015, ne), r(1008, ne), r(1009, ne), r(1040, ne), r(1041, ne), r(1115, Vt), r(
        1182,
        Vt
      ), r(1185, Vt), r(1186, wi), r(1187, _a), r(17, bi), r(114, JSON.parse.bind(JSON)), r(
        3802,
        JSON.parse.bind(JSON)
      ), r(199, gi), r(3807, gi), r(3907, ne), r(2951, ne), r(791, ne), r(
        1183,
        ne
      ), r(1270, ne);
    }, "init");
    vi.exports = { init: Ia };
  });
  var Ai = I((kh, _i) => {
    "use strict";
    p();
    var Y = 1e6;
    function Ta(r) {
      var e = r.readInt32BE(
        0
      ), t = r.readUInt32BE(4), n = "";
      e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
      var i = "", s, o, u, c, h, l;
      {
        if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
          return n + u + i;
        for (c = "", h = 6 - u.length, l = 0; l < h; l++)
          c += "0";
        i = c + u + i;
      }
      {
        if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
          return n + u + i;
        for (c = "", h = 6 - u.length, l = 0; l < h; l++)
          c += "0";
        i = c + u + i;
      }
      {
        if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
          return n + u + i;
        for (c = "", h = 6 - u.length, l = 0; l < h; l++)
          c += "0";
        i = c + u + i;
      }
      return s = e % Y, o = 4294967296 * s + t, u = "" + o % Y, n + u + i;
    }
    a(Ta, "readInt8");
    _i.exports = Ta;
  });
  var Bi = I((qh, Pi) => {
    p();
    var Pa = Ai(), F = a(function(r, e, t, n, i) {
      t = t || 0, n = n || false, i = i || function(A, B, W) {
        return A * Math.pow(2, W) + B;
      };
      var s = t >> 3, o = a(function(A) {
        return n ? ~A & 255 : A;
      }, "inv"), u = 255, c = 8 - t % 8;
      e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
      var h = 0;
      t % 8 + e >= 8 && (h = i(0, o(r[s]) & u, c));
      for (var l = e + t >> 3, y = s + 1; y < l; y++)
        h = i(h, o(r[y]), 8);
      var x = (e + t) % 8;
      return x > 0 && (h = i(h, o(r[l]) >> 8 - x, x)), h;
    }, "parseBits"), Ti = a(function(r, e, t) {
      var n = Math.pow(2, t - 1) - 1, i = F(r, 1), s = F(r, t, 1);
      if (s === 0)
        return 0;
      var o = 1, u = a(function(h, l, y) {
        h === 0 && (h = 1);
        for (var x = 1; x <= y; x++)
          o /= 2, (l & 1 << y - x) > 0 && (h += o);
        return h;
      }, "parsePrecisionBits"), c = F(r, e, t + 1, false, u);
      return s == Math.pow(2, t + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
    }, "parseFloatFromBits"), Ba = a(function(r) {
      return F(r, 1) == 1 ? -1 * (F(r, 15, 1, true) + 1) : F(r, 15, 1);
    }, "parseInt16"), Ci = a(function(r) {
      return F(r, 1) == 1 ? -1 * (F(
        r,
        31,
        1,
        true
      ) + 1) : F(r, 31, 1);
    }, "parseInt32"), La = a(function(r) {
      return Ti(r, 23, 8);
    }, "parseFloat32"), Ra = a(function(r) {
      return Ti(r, 52, 11);
    }, "parseFloat64"), Fa = a(function(r) {
      var e = F(r, 16, 32);
      if (e == 49152)
        return NaN;
      for (var t = Math.pow(1e4, F(r, 16, 16)), n = 0, i = [], s = F(r, 16), o = 0; o < s; o++)
        n += F(r, 16, 64 + 16 * o) * t, t /= 1e4;
      var u = Math.pow(10, F(r, 16, 48));
      return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
    }, "parseNumeric"), Ii = a(function(r, e) {
      var t = F(
        e,
        1
      ), n = F(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
      return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
        return this.usec;
      }, i.setMicroSeconds = function(s) {
        this.usec = s;
      }, i.getUTCMicroSeconds = function() {
        return this.usec;
      }, i;
    }, "parseDate"), Ye = a(function(r) {
      for (var e = F(r, 32), t = F(r, 32, 32), n = F(r, 32, 64), i = 96, s = [], o = 0; o < e; o++)
        s[o] = F(r, 32, i), i += 32, i += 32;
      var u = a(function(h) {
        var l = F(r, 32, i);
        if (i += 32, l == 4294967295)
          return null;
        var y;
        if (h == 23 || h == 20)
          return y = F(r, l * 8, i), i += l * 8, y;
        if (h == 25)
          return y = r.toString(this.encoding, i >> 3, (i += l << 3) >> 3), y;
        console.log("ERROR: ElementType not implemented: " + h);
      }, "parseElement"), c = a(function(h, l) {
        var y = [], x;
        if (h.length > 1) {
          var A = h.shift();
          for (x = 0; x < A; x++)
            y[x] = c(h, l);
          h.unshift(
            A
          );
        } else
          for (x = 0; x < h[0]; x++)
            y[x] = u(l);
        return y;
      }, "parse");
      return c(s, n);
    }, "parseArray"), Ma = a(function(r) {
      return r.toString("utf8");
    }, "parseText"), Da = a(function(r) {
      return r === null ? null : F(r, 8) > 0;
    }, "parseBool"), ka = a(function(r) {
      r(20, Pa), r(21, Ba), r(23, Ci), r(
        26,
        Ci
      ), r(1700, Fa), r(700, La), r(701, Ra), r(16, Da), r(1114, Ii.bind(null, false)), r(1184, Ii.bind(
        null,
        true
      )), r(1e3, Ye), r(1007, Ye), r(1016, Ye), r(1008, Ye), r(1009, Ye), r(25, Ma);
    }, "init");
    Pi.exports = { init: ka };
  });
  var Ri = I((Wh, Li) => {
    p();
    Li.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  });
  var Xe = I((Je) => {
    p();
    var Ua = Ei(), Oa = Bi(), qa = Wt(), Na = Ri();
    Je.getTypeParser = Qa;
    Je.setTypeParser = Wa;
    Je.arrayParser = qa;
    Je.builtins = Na;
    var Ze = { text: {}, binary: {} };
    function Fi(r) {
      return String(
        r
      );
    }
    a(Fi, "noParse");
    function Qa(r, e) {
      return e = e || "text", Ze[e] && Ze[e][r] || Fi;
    }
    a(
      Qa,
      "getTypeParser"
    );
    function Wa(r, e, t) {
      typeof e == "function" && (t = e, e = "text"), Ze[e][r] = t;
    }
    a(Wa, "setTypeParser");
    Ua.init(function(r, e) {
      Ze.text[r] = e;
    });
    Oa.init(function(r, e) {
      Ze.binary[r] = e;
    });
  });
  var et = I((Vh, Yt) => {
    "use strict";
    p();
    Yt.exports = {
      host: "localhost",
      user: m.platform === "win32" ? m.env.USERNAME : m.env.USER,
      database: void 0,
      password: null,
      connectionString: void 0,
      port: 5432,
      rows: 0,
      binary: false,
      max: 10,
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      statement_timeout: false,
      lock_timeout: false,
      idle_in_transaction_session_timeout: false,
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var Me = Xe(), ja = Me.getTypeParser(
      20,
      "text"
    ), Ha = Me.getTypeParser(1016, "text");
    Yt.exports.__defineSetter__("parseInt8", function(r) {
      Me.setTypeParser(20, "text", r ? Me.getTypeParser(23, "text") : ja), Me.setTypeParser(1016, "text", r ? Me.getTypeParser(1007, "text") : Ha);
    });
  });
  var tt = I((zh, Di) => {
    "use strict";
    p();
    var Ga = (qt(), O(Ot)), $a = et();
    function Va(r) {
      var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + e + '"';
    }
    a(Va, "escapeElement");
    function Mi(r) {
      for (var e = "{", t = 0; t < r.length; t++)
        t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + Mi(r[t]) : r[t] instanceof d ? e += "\\\\x" + r[t].toString("hex") : e += Va(ft(r[t]));
      return e = e + "}", e;
    }
    a(Mi, "arrayString");
    var ft = a(function(r, e) {
      if (r == null)
        return null;
      if (r instanceof d)
        return r;
      if (ArrayBuffer.isView(r)) {
        var t = d.from(r.buffer, r.byteOffset, r.byteLength);
        return t.length === r.byteLength ? t : t.slice(
          r.byteOffset,
          r.byteOffset + r.byteLength
        );
      }
      return r instanceof Date ? $a.parseInputDatesAsUTC ? Ya(r) : za(r) : Array.isArray(r) ? Mi(r) : typeof r == "object" ? Ka(r, e) : r.toString();
    }, "prepareValue");
    function Ka(r, e) {
      if (r && typeof r.toPostgres == "function") {
        if (e = e || [], e.indexOf(r) !== -1)
          throw new Error('circular reference detected while preparing "' + r + '" for query');
        return e.push(r), ft(r.toPostgres(ft), e);
      }
      return JSON.stringify(r);
    }
    a(Ka, "prepareObject");
    function H(r, e) {
      for (r = "" + r; r.length < e; )
        r = "0" + r;
      return r;
    }
    a(
      H,
      "pad"
    );
    function za(r) {
      var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
      n && (t = Math.abs(t) + 1);
      var i = H(t, 4) + "-" + H(r.getMonth() + 1, 2) + "-" + H(r.getDate(), 2) + "T" + H(r.getHours(), 2) + ":" + H(r.getMinutes(), 2) + ":" + H(r.getSeconds(), 2) + "." + H(
        r.getMilliseconds(),
        3
      );
      return e < 0 ? (i += "-", e *= -1) : i += "+", i += H(Math.floor(e / 60), 2) + ":" + H(e % 60, 2), n && (i += " BC"), i;
    }
    a(za, "dateToString");
    function Ya(r) {
      var e = r.getUTCFullYear(), t = e < 1;
      t && (e = Math.abs(e) + 1);
      var n = H(e, 4) + "-" + H(r.getUTCMonth() + 1, 2) + "-" + H(r.getUTCDate(), 2) + "T" + H(r.getUTCHours(), 2) + ":" + H(r.getUTCMinutes(), 2) + ":" + H(r.getUTCSeconds(), 2) + "." + H(r.getUTCMilliseconds(), 3);
      return n += "+00:00", t && (n += " BC"), n;
    }
    a(Ya, "dateToStringUTC");
    function Za(r, e, t) {
      return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
    }
    a(Za, "normalizeQueryConfig");
    var Zt = a(function(r) {
      return Ga.createHash("md5").update(r, "utf-8").digest("hex");
    }, "md5"), Ja = a(function(r, e, t) {
      var n = Zt(e + r), i = Zt(d.concat([d.from(n), t]));
      return "md5" + i;
    }, "postgresMd5PasswordHash");
    Di.exports = { prepareValue: a(function(e) {
      return ft(
        e
      );
    }, "prepareValueWrapper"), normalizeQueryConfig: Za, postgresMd5PasswordHash: Ja, md5: Zt };
  });
  var Ni = I((Jh, qi) => {
    "use strict";
    p();
    var Jt = (qt(), O(Ot));
    function Xa(r) {
      if (r.indexOf(
        "SCRAM-SHA-256"
      ) === -1)
        throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
      let e = Jt.randomBytes(18).toString("base64");
      return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
    }
    a(Xa, "startSession");
    function eu(r, e, t) {
      if (r.message !== "SASLInitialResponse")
        throw new Error(
          "SASL: Last message was not SASLInitialResponse"
        );
      if (typeof e != "string")
        throw new Error(
          "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
        );
      if (typeof t != "string")
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      let n = nu(t);
      if (n.nonce.startsWith(r.clientNonce)) {
        if (n.nonce.length === r.clientNonce.length)
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      } else
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      var i = d.from(n.salt, "base64"), s = ou(
        e,
        i,
        n.iteration
      ), o = De(s, "Client Key"), u = su(o), c = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, y = c + "," + h + "," + l, x = De(u, y), A = Oi(
        o,
        x
      ), B = A.toString("base64"), W = De(s, "Server Key"), J = De(W, y);
      r.message = "SASLResponse", r.serverSignature = J.toString("base64"), r.response = l + ",p=" + B;
    }
    a(eu, "continueSession");
    function tu(r, e) {
      if (r.message !== "SASLResponse")
        throw new Error("SASL: Last message was not SASLResponse");
      if (typeof e != "string")
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      let { serverSignature: t } = iu(
        e
      );
      if (t !== r.serverSignature)
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
    }
    a(tu, "finalizeSession");
    function ru(r) {
      if (typeof r != "string")
        throw new TypeError("SASL: text must be a string");
      return r.split("").map(
        (e, t) => r.charCodeAt(t)
      ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
    }
    a(ru, "isPrintableChars");
    function ki(r) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
    }
    a(ki, "isBase64");
    function Ui(r) {
      if (typeof r != "string")
        throw new TypeError(
          "SASL: attribute pairs text must be a string"
        );
      return new Map(r.split(",").map((e) => {
        if (!/^.=/.test(e))
          throw new Error("SASL: Invalid attribute pair entry");
        let t = e[0], n = e.substring(2);
        return [t, n];
      }));
    }
    a(Ui, "parseAttributePairs");
    function nu(r) {
      let e = Ui(
        r
      ), t = e.get("r");
      if (t) {
        if (!ru(t))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      } else
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      let n = e.get("s");
      if (n) {
        if (!ki(n))
          throw new Error(
            "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
          );
      } else
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      let i = e.get("i");
      if (i) {
        if (!/^[1-9][0-9]*$/.test(i))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      } else
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      let s = parseInt(i, 10);
      return { nonce: t, salt: n, iteration: s };
    }
    a(nu, "parseServerFirstMessage");
    function iu(r) {
      let t = Ui(r).get("v");
      if (t) {
        if (!ki(t))
          throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      } else
        throw new Error(
          "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
        );
      return { serverSignature: t };
    }
    a(iu, "parseServerFinalMessage");
    function Oi(r, e) {
      if (!d.isBuffer(r))
        throw new TypeError(
          "first argument must be a Buffer"
        );
      if (!d.isBuffer(e))
        throw new TypeError("second argument must be a Buffer");
      if (r.length !== e.length)
        throw new Error("Buffer lengths must match");
      if (r.length === 0)
        throw new Error("Buffers cannot be empty");
      return d.from(r.map((t, n) => r[n] ^ e[n]));
    }
    a(Oi, "xorBuffers");
    function su(r) {
      return Jt.createHash(
        "sha256"
      ).update(r).digest();
    }
    a(su, "sha256");
    function De(r, e) {
      return Jt.createHmac(
        "sha256",
        r
      ).update(e).digest();
    }
    a(De, "hmacSha256");
    function ou(r, e, t) {
      for (var n = De(
        r,
        d.concat([e, d.from([0, 0, 0, 1])])
      ), i = n, s = 0; s < t - 1; s++)
        n = De(r, n), i = Oi(i, n);
      return i;
    }
    a(ou, "Hi");
    qi.exports = { startSession: Xa, continueSession: eu, finalizeSession: tu };
  });
  var Xt = {};
  te(Xt, { join: () => au });
  function au(...r) {
    return r.join("/");
  }
  var er = $(() => {
    "use strict";
    p();
    a(au, "join");
  });
  var tr = {};
  te(tr, { stat: () => uu });
  function uu(r, e) {
    e(new Error("No filesystem"));
  }
  var rr = $(
    () => {
      "use strict";
      p();
      a(uu, "stat");
    }
  );
  var nr = {};
  te(nr, { default: () => cu });
  var cu;
  var ir = $(() => {
    "use strict";
    p();
    cu = {};
  });
  var Qi = {};
  te(Qi, { StringDecoder: () => sr });
  var or;
  var sr;
  var Wi = $(() => {
    "use strict";
    p();
    or = class or {
      constructor(e) {
        T(this, "td");
        this.td = new TextDecoder(e);
      }
      write(e) {
        return this.td.decode(e, { stream: true });
      }
      end(e) {
        return this.td.decode(e);
      }
    };
    a(or, "StringDecoder");
    sr = or;
  });
  var $i = I((ul, Gi) => {
    "use strict";
    p();
    var { Transform: hu } = (ir(), O(nr)), { StringDecoder: lu } = (Wi(), O(Qi)), be = Symbol("last"), pt = Symbol("decoder");
    function fu(r, e, t) {
      let n;
      if (this.overflow) {
        if (n = this[pt].write(r).split(this.matcher), n.length === 1)
          return t();
        n.shift(), this.overflow = false;
      } else
        this[be] += this[pt].write(r), n = this[be].split(this.matcher);
      this[be] = n.pop();
      for (let i = 0; i < n.length; i++)
        try {
          Hi(this, this.mapper(n[i]));
        } catch (s) {
          return t(
            s
          );
        }
      if (this.overflow = this[be].length > this.maxLength, this.overflow && !this.skipOverflow) {
        t(new Error("maximum buffer reached"));
        return;
      }
      t();
    }
    a(fu, "transform");
    function pu(r) {
      if (this[be] += this[pt].end(), this[be])
        try {
          Hi(this, this.mapper(this[be]));
        } catch (e) {
          return r(e);
        }
      r();
    }
    a(pu, "flush");
    function Hi(r, e) {
      e !== void 0 && r.push(e);
    }
    a(Hi, "push");
    function ji(r) {
      return r;
    }
    a(ji, "noop");
    function du(r, e, t) {
      switch (r = r || /\r?\n/, e = e || ji, t = t || {}, arguments.length) {
        case 1:
          typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
          break;
        case 2:
          typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = ji);
      }
      t = Object.assign({}, t), t.autoDestroy = true, t.transform = fu, t.flush = pu, t.readableObjectMode = true;
      let n = new hu(t);
      return n[be] = "", n[pt] = new lu("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
        this._writableState.errorEmitted = false, s(i);
      }, n;
    }
    a(du, "split");
    Gi.exports = du;
  });
  var zi = I((ll, pe) => {
    "use strict";
    p();
    var Vi = (er(), O(Xt)), yu = (ir(), O(nr)).Stream, mu = $i(), Ki = (Ge(), O(He)), gu = 5432, dt = m.platform === "win32", rt = m.stderr, wu = 56, bu = 7, Su = 61440, xu = 32768;
    function vu(r) {
      return (r & Su) == xu;
    }
    a(vu, "isRegFile");
    var ke = [
      "host",
      "port",
      "database",
      "user",
      "password"
    ], ar = ke.length, Eu = ke[ar - 1];
    function ur() {
      var r = rt instanceof yu && rt.writable === true;
      if (r) {
        var e = Array.prototype.slice.call(arguments).concat(`
`);
        rt.write(Ki.format.apply(Ki, e));
      }
    }
    a(ur, "warn");
    Object.defineProperty(
      pe.exports,
      "isWin",
      { get: function() {
        return dt;
      }, set: function(r) {
        dt = r;
      } }
    );
    pe.exports.warnTo = function(r) {
      var e = rt;
      return rt = r, e;
    };
    pe.exports.getFileName = function(r) {
      var e = r || m.env, t = e.PGPASSFILE || (dt ? Vi.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : Vi.join(e.HOME || "./", ".pgpass"));
      return t;
    };
    pe.exports.usePgPass = function(r, e) {
      return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : dt ? true : (e = e || "<unkn>", vu(r.mode) ? r.mode & (wu | bu) ? (ur('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (ur(
        'WARNING: password file "%s" is not a plain file',
        e
      ), false));
    };
    var _u = pe.exports.match = function(r, e) {
      return ke.slice(0, -1).reduce(
        function(t, n, i) {
          return i == 1 && Number(r[n] || gu) === Number(e[n]) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
        },
        true
      );
    };
    pe.exports.getPassword = function(r, e, t) {
      var n, i = e.pipe(mu());
      function s(c) {
        var h = Au(
          c
        );
        h && Cu(h) && _u(r, h) && (n = h[Eu], i.end());
      }
      a(s, "onLine");
      var o = a(function() {
        e.destroy(), t(n);
      }, "onEnd"), u = a(function(c) {
        e.destroy(), ur("WARNING: error on reading file: %s", c), t(void 0);
      }, "onErr");
      e.on("error", u), i.on("data", s).on("end", o).on(
        "error",
        u
      );
    };
    var Au = pe.exports.parseLine = function(r) {
      if (r.length < 11 || r.match(/^\s+#/))
        return null;
      for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(function(l, y, x) {
        var A = r.substring(
          y,
          x
        );
        Object.hasOwnProperty.call(m.env, "PGPASS_NO_DEESCAPE") || (A = A.replace(
          /\\([:\\])/g,
          "$1"
        )), o[ke[l]] = A;
      }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
        if (e = r.charAt(h + 1), t = r.charAt(
          h
        ), u = n == ar - 1, u) {
          c(n, i);
          break;
        }
        h >= 0 && e == ":" && t !== "\\" && (c(n, i, h + 1), i = h + 2, n += 1);
      }
      return o = Object.keys(o).length === ar ? o : null, o;
    }, Cu = pe.exports.isValidEntry = function(r) {
      for (var e = {
        0: function(o) {
          return o.length > 0;
        },
        1: function(o) {
          return o === "*" ? true : (o = Number(o), isFinite(
            o
          ) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
        },
        2: function(o) {
          return o.length > 0;
        },
        3: function(o) {
          return o.length > 0;
        },
        4: function(o) {
          return o.length > 0;
        }
      }, t = 0; t < ke.length; t += 1) {
        var n = e[t], i = r[ke[t]] || "", s = n(i);
        if (!s)
          return false;
      }
      return true;
    };
  });
  var Zi = I((yl, cr) => {
    "use strict";
    p();
    var dl = (er(), O(Xt)), Yi = (rr(), O(tr)), yt = zi();
    cr.exports = function(r, e) {
      var t = yt.getFileName();
      Yi.stat(t, function(n, i) {
        if (n || !yt.usePgPass(i, t))
          return e(void 0);
        var s = Yi.createReadStream(t);
        yt.getPassword(
          r,
          s,
          e
        );
      });
    };
    cr.exports.warnTo = yt.warnTo;
  });
  var hr = I((gl, Ji) => {
    "use strict";
    p();
    var Iu = Xe();
    function mt(r) {
      this._types = r || Iu, this.text = {}, this.binary = {};
    }
    a(mt, "TypeOverrides");
    mt.prototype.getOverrides = function(r) {
      switch (r) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    mt.prototype.setTypeParser = function(r, e, t) {
      typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
    };
    mt.prototype.getTypeParser = function(r, e) {
      return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
    };
    Ji.exports = mt;
  });
  var Xi = {};
  te(Xi, { default: () => Tu });
  var Tu;
  var es = $(() => {
    "use strict";
    p();
    Tu = {};
  });
  var ts = {};
  te(ts, { parse: () => lr });
  function lr(r, e = false) {
    let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
      username: i,
      password: s,
      host: o,
      hostname: u,
      port: c,
      pathname: h,
      search: l,
      searchParams: y,
      hash: x
    } = new URL(n);
    s = decodeURIComponent(s), i = decodeURIComponent(
      i
    ), h = decodeURIComponent(h);
    let A = i + ":" + s, B = e ? Object.fromEntries(y.entries()) : l;
    return {
      href: r,
      protocol: t,
      auth: A,
      username: i,
      password: s,
      host: o,
      hostname: u,
      port: c,
      pathname: h,
      search: l,
      query: B,
      hash: x
    };
  }
  var fr = $(() => {
    "use strict";
    p();
    a(lr, "parse");
  });
  var ns = I((El, rs) => {
    "use strict";
    p();
    var Pu = (fr(), O(ts)), pr = (rr(), O(tr));
    function dr(r) {
      if (r.charAt(0) === "/") {
        var t = r.split(" ");
        return { host: t[0], database: t[1] };
      }
      var e = Pu.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
        /\%25(\d\d)/g,
        "%$1"
      ) : r, true), t = e.query;
      for (var n in t)
        Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
      var i = (e.auth || ":").split(":");
      if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:")
        return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
      t.host || (t.host = e.hostname);
      var s = e.pathname;
      if (!t.host && s && /^%2f/i.test(s)) {
        var o = s.split("/");
        t.host = decodeURIComponent(
          o[0]
        ), s = o.splice(1).join("/");
      }
      switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = pr.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = pr.readFileSync(
        t.sslkey
      ).toString()), t.sslrootcert && (t.ssl.ca = pr.readFileSync(t.sslrootcert).toString()), t.sslmode) {
        case "disable": {
          t.ssl = false;
          break;
        }
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          break;
        case "no-verify": {
          t.ssl.rejectUnauthorized = false;
          break;
        }
      }
      return t;
    }
    a(dr, "parse");
    rs.exports = dr;
    dr.parse = dr;
  });
  var gt = I((Cl, os) => {
    "use strict";
    p();
    var Bu = (es(), O(Xi)), ss = et(), is = ns().parse, V = a(
      function(r, e, t) {
        return t === void 0 ? t = m.env["PG" + r.toUpperCase()] : t === false || (t = m.env[t]), e[r] || t || ss[r];
      },
      "val"
    ), Lu = a(function() {
      switch (m.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return ss.ssl;
    }, "readSSLConfigFromEnvironment"), Ue = a(
      function(r) {
        return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
      },
      "quoteParamValue"
    ), ie = a(function(r, e, t) {
      var n = e[t];
      n != null && r.push(t + "=" + Ue(n));
    }, "add"), mr = class mr {
      constructor(e) {
        e = typeof e == "string" ? is(e) : e || {}, e.connectionString && (e = Object.assign({}, e, is(e.connectionString))), this.user = V("user", e), this.database = V("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
          V("port", e),
          10
        ), this.host = V("host", e), Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: V("password", e)
        }), this.binary = V("binary", e), this.options = V("options", e), this.ssl = typeof e.ssl > "u" ? Lu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V("client_encoding", e), this.replication = V("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V("application_name", e, "PGAPPNAME"), this.fallback_application_name = V("fallback_application_name", e, false), this.statement_timeout = V("statement_timeout", e, false), this.lock_timeout = V(
          "lock_timeout",
          e,
          false
        ), this.idle_in_transaction_session_timeout = V("idle_in_transaction_session_timeout", e, false), this.query_timeout = V("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
      }
      getLibpqConnectionString(e) {
        var t = [];
        ie(t, this, "user"), ie(t, this, "password"), ie(t, this, "port"), ie(t, this, "application_name"), ie(t, this, "fallback_application_name"), ie(t, this, "connect_timeout"), ie(
          t,
          this,
          "options"
        );
        var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        if (ie(t, n, "sslmode"), ie(t, n, "sslca"), ie(t, n, "sslkey"), ie(t, n, "sslcert"), ie(t, n, "sslrootcert"), this.database && t.push("dbname=" + Ue(this.database)), this.replication && t.push("replication=" + Ue(this.replication)), this.host && t.push("host=" + Ue(this.host)), this.isDomainSocket)
          return e(null, t.join(" "));
        this.client_encoding && t.push("client_encoding=" + Ue(this.client_encoding)), Bu.lookup(this.host, function(i, s) {
          return i ? e(i, null) : (t.push("hostaddr=" + Ue(s)), e(null, t.join(" ")));
        });
      }
    };
    a(mr, "ConnectionParameters");
    var yr = mr;
    os.exports = yr;
  });
  var cs = I((Pl, us) => {
    "use strict";
    p();
    var Ru = Xe(), as = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, wr = class wr {
      constructor(e, t) {
        this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
      }
      addCommandComplete(e) {
        var t;
        e.text ? t = as.exec(e.text) : t = as.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
          t[2],
          10
        )));
      }
      _parseRowAsArray(e) {
        for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
          var s = e[n];
          s !== null ? t[n] = this._parsers[n](s) : t[n] = null;
        }
        return t;
      }
      parseRow(e) {
        for (var t = {}, n = 0, i = e.length; n < i; n++) {
          var s = e[n], o = this.fields[n].name;
          s !== null ? t[o] = this._parsers[n](
            s
          ) : t[o] = null;
        }
        return t;
      }
      addRow(e) {
        this.rows.push(e);
      }
      addFields(e) {
        this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
        for (var t = 0; t < e.length; t++) {
          var n = e[t];
          this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Ru.getTypeParser(n.dataTypeID, n.format || "text");
        }
      }
    };
    a(wr, "Result");
    var gr = wr;
    us.exports = gr;
  });
  var ps = I((Rl, fs) => {
    "use strict";
    p();
    var { EventEmitter: Fu } = we(), hs = cs(), ls = tt(), Sr = class Sr extends Fu {
      constructor(e, t, n) {
        super(), e = ls.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m.domain && e.callback && (this.callback = m.domain.bind(e.callback)), this._result = new hs(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
      }
      requiresPreparation() {
        return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
      }
      _checkForMultirow() {
        this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new hs(
          this._rowMode,
          this.types
        ), this._results.push(this._result));
      }
      handleRowDescription(e) {
        this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(e) {
        let t;
        if (!this._canceledDueToError) {
          try {
            t = this._result.parseRow(e.fields);
          } catch (n) {
            this._canceledDueToError = n;
            return;
          }
          this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
        }
      }
      handleCommandComplete(e, t) {
        this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
      }
      handleEmptyQuery(e) {
        this.rows && e.sync();
      }
      handleError(e, t) {
        if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback)
          return this.callback(e);
        this.emit("error", e);
      }
      handleReadyForQuery(e) {
        if (this._canceledDueToError)
          return this.handleError(
            this._canceledDueToError,
            e
          );
        if (this.callback)
          try {
            this.callback(null, this._results);
          } catch (t) {
            m.nextTick(() => {
              throw t;
            });
          }
        this.emit("end", this._results);
      }
      submit(e) {
        if (typeof this.text != "string" && typeof this.name != "string")
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        let t = e.parsedStatements[this.name];
        return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
      }
      hasBeenParsed(e) {
        return this.name && e.parsedStatements[this.name];
      }
      handlePortalSuspended(e) {
        this._getRows(e, this.rows);
      }
      _getRows(e, t) {
        e.execute(
          { portal: this.portal, rows: t }
        ), t ? e.flush() : e.sync();
      }
      prepare(e) {
        this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
        try {
          e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: ls.prepareValue });
        } catch (t) {
          this.handleError(t, e);
          return;
        }
        e.describe(
          { type: "P", name: this.portal || "" }
        ), this._getRows(e, this.rows);
      }
      handleCopyInResponse(e) {
        e.sendCopyFail("No source stream defined");
      }
      handleCopyData(e, t) {
      }
    };
    a(Sr, "Query");
    var br = Sr;
    fs.exports = br;
  });
  var ys = {};
  te(ys, { Socket: () => Ae, isIP: () => Mu });
  function Mu(r) {
    return 0;
  }
  var ds;
  var Du;
  var E;
  var Ae;
  var wt = $(() => {
    "use strict";
    p();
    ds = We(we(), 1);
    a(Mu, "isIP");
    Du = a((r) => r.replace(
      /^[^.]+\./,
      "api."
    ), "transformHost"), E = class E2 extends ds.EventEmitter {
      constructor() {
        super(...arguments);
        T(this, "opts", {});
        T(this, "connecting", false);
        T(this, "pending", true);
        T(
          this,
          "writable",
          true
        );
        T(this, "encrypted", false);
        T(this, "authorized", false);
        T(this, "destroyed", false);
        T(
          this,
          "ws",
          null
        );
        T(this, "writeBuffer");
        T(this, "tlsState", 0);
        T(this, "tlsRead");
        T(this, "tlsWrite");
      }
      static get poolQueryViaFetch() {
        return E2.opts.poolQueryViaFetch ?? E2.defaults.poolQueryViaFetch;
      }
      static set poolQueryViaFetch(t) {
        E2.opts.poolQueryViaFetch = t;
      }
      static get fetchEndpoint() {
        return E2.opts.fetchEndpoint ?? E2.defaults.fetchEndpoint;
      }
      static set fetchEndpoint(t) {
        E2.opts.fetchEndpoint = t;
      }
      static get fetchConnectionCache() {
        return true;
      }
      static set fetchConnectionCache(t) {
        console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
      }
      static get fetchFunction() {
        return E2.opts.fetchFunction ?? E2.defaults.fetchFunction;
      }
      static set fetchFunction(t) {
        E2.opts.fetchFunction = t;
      }
      static get webSocketConstructor() {
        return E2.opts.webSocketConstructor ?? E2.defaults.webSocketConstructor;
      }
      static set webSocketConstructor(t) {
        E2.opts.webSocketConstructor = t;
      }
      get webSocketConstructor() {
        return this.opts.webSocketConstructor ?? E2.webSocketConstructor;
      }
      set webSocketConstructor(t) {
        this.opts.webSocketConstructor = t;
      }
      static get wsProxy() {
        return E2.opts.wsProxy ?? E2.defaults.wsProxy;
      }
      static set wsProxy(t) {
        E2.opts.wsProxy = t;
      }
      get wsProxy() {
        return this.opts.wsProxy ?? E2.wsProxy;
      }
      set wsProxy(t) {
        this.opts.wsProxy = t;
      }
      static get coalesceWrites() {
        return E2.opts.coalesceWrites ?? E2.defaults.coalesceWrites;
      }
      static set coalesceWrites(t) {
        E2.opts.coalesceWrites = t;
      }
      get coalesceWrites() {
        return this.opts.coalesceWrites ?? E2.coalesceWrites;
      }
      set coalesceWrites(t) {
        this.opts.coalesceWrites = t;
      }
      static get useSecureWebSocket() {
        return E2.opts.useSecureWebSocket ?? E2.defaults.useSecureWebSocket;
      }
      static set useSecureWebSocket(t) {
        E2.opts.useSecureWebSocket = t;
      }
      get useSecureWebSocket() {
        return this.opts.useSecureWebSocket ?? E2.useSecureWebSocket;
      }
      set useSecureWebSocket(t) {
        this.opts.useSecureWebSocket = t;
      }
      static get forceDisablePgSSL() {
        return E2.opts.forceDisablePgSSL ?? E2.defaults.forceDisablePgSSL;
      }
      static set forceDisablePgSSL(t) {
        E2.opts.forceDisablePgSSL = t;
      }
      get forceDisablePgSSL() {
        return this.opts.forceDisablePgSSL ?? E2.forceDisablePgSSL;
      }
      set forceDisablePgSSL(t) {
        this.opts.forceDisablePgSSL = t;
      }
      static get disableSNI() {
        return E2.opts.disableSNI ?? E2.defaults.disableSNI;
      }
      static set disableSNI(t) {
        E2.opts.disableSNI = t;
      }
      get disableSNI() {
        return this.opts.disableSNI ?? E2.disableSNI;
      }
      set disableSNI(t) {
        this.opts.disableSNI = t;
      }
      static get pipelineConnect() {
        return E2.opts.pipelineConnect ?? E2.defaults.pipelineConnect;
      }
      static set pipelineConnect(t) {
        E2.opts.pipelineConnect = t;
      }
      get pipelineConnect() {
        return this.opts.pipelineConnect ?? E2.pipelineConnect;
      }
      set pipelineConnect(t) {
        this.opts.pipelineConnect = t;
      }
      static get subtls() {
        return E2.opts.subtls ?? E2.defaults.subtls;
      }
      static set subtls(t) {
        E2.opts.subtls = t;
      }
      get subtls() {
        return this.opts.subtls ?? E2.subtls;
      }
      set subtls(t) {
        this.opts.subtls = t;
      }
      static get pipelineTLS() {
        return E2.opts.pipelineTLS ?? E2.defaults.pipelineTLS;
      }
      static set pipelineTLS(t) {
        E2.opts.pipelineTLS = t;
      }
      get pipelineTLS() {
        return this.opts.pipelineTLS ?? E2.pipelineTLS;
      }
      set pipelineTLS(t) {
        this.opts.pipelineTLS = t;
      }
      static get rootCerts() {
        return E2.opts.rootCerts ?? E2.defaults.rootCerts;
      }
      static set rootCerts(t) {
        E2.opts.rootCerts = t;
      }
      get rootCerts() {
        return this.opts.rootCerts ?? E2.rootCerts;
      }
      set rootCerts(t) {
        this.opts.rootCerts = t;
      }
      wsProxyAddrForHost(t, n) {
        let i = this.wsProxy;
        if (i === void 0)
          throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
        return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      connect(t, n, i) {
        this.connecting = true, i && this.once("connect", i);
        let s = a(() => {
          this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
        }, "handleWebSocketOpen"), o = a((c, h = false) => {
          c.binaryType = "arraybuffer", c.addEventListener("error", (l) => {
            this.emit("error", l), this.emit("close");
          }), c.addEventListener("message", (l) => {
            if (this.tlsState === 0) {
              let y = d.from(l.data);
              this.emit(
                "data",
                y
              );
            }
          }), c.addEventListener("close", () => {
            this.emit("close");
          }), h ? s() : c.addEventListener(
            "open",
            s
          );
        }, "configureWebSocket"), u;
        try {
          u = this.wsProxyAddrForHost(n, typeof t == "string" ? parseInt(t, 10) : t);
        } catch (c) {
          this.emit("error", c), this.emit("close");
          return;
        }
        try {
          let h = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
          if (this.webSocketConstructor !== void 0)
            this.ws = new this.webSocketConstructor(h), o(this.ws);
          else
            try {
              this.ws = new WebSocket(
                h
              ), o(this.ws);
            } catch {
              this.ws = new __unstable_WebSocket(h), o(this.ws);
            }
        } catch (c) {
          let l = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
          fetch(l, { headers: { Upgrade: "websocket" } }).then((y) => {
            if (this.ws = y.webSocket, this.ws == null)
              throw c;
            this.ws.accept(), o(
              this.ws,
              true
            );
          }).catch((y) => {
            this.emit("error", new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${y.message}`)), this.emit("close");
          });
        }
      }
      async startTls(t) {
        if (this.subtls === void 0)
          throw new Error("For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information.");
        this.tlsState = 1;
        let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(
          i
        ), o = this.rawWrite.bind(this), [u, c] = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
        this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit(
          "secureConnection",
          this
        ), this.tlsReadLoop();
      }
      async tlsReadLoop() {
        for (; ; ) {
          let t = await this.tlsRead();
          if (t === void 0)
            break;
          {
            let n = d.from(t);
            this.emit("data", n);
          }
        }
      }
      rawWrite(t) {
        if (!this.coalesceWrites) {
          this.ws.send(t);
          return;
        }
        if (this.writeBuffer === void 0)
          this.writeBuffer = t, setTimeout(
            () => {
              this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
            },
            0
          );
        else {
          let n = new Uint8Array(this.writeBuffer.length + t.length);
          n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
        }
      }
      write(t, n = "utf8", i = (s) => {
      }) {
        return t.length === 0 ? (i(), true) : (typeof t == "string" && (t = d.from(t, n)), this.tlsState === 0 ? (this.rawWrite(t), i()) : this.tlsState === 1 ? this.once("secureConnection", () => {
          this.write(
            t,
            n,
            i
          );
        }) : (this.tlsWrite(t), i()), true);
      }
      end(t = d.alloc(0), n = "utf8", i = () => {
      }) {
        return this.write(t, n, () => {
          this.ws.close(), i();
        }), this;
      }
      destroy() {
        return this.destroyed = true, this.end();
      }
    };
    a(E, "Socket"), T(E, "defaults", {
      poolQueryViaFetch: false,
      fetchEndpoint: (t) => "https://" + Du(t) + "/sql",
      fetchConnectionCache: true,
      fetchFunction: void 0,
      webSocketConstructor: void 0,
      wsProxy: (t) => t + "/v2",
      useSecureWebSocket: true,
      forceDisablePgSSL: true,
      coalesceWrites: true,
      pipelineConnect: "password",
      subtls: void 0,
      rootCerts: "",
      pipelineTLS: false,
      disableSNI: false
    }), T(E, "opts", {});
    Ae = E;
  });
  var zr = I((C) => {
    "use strict";
    p();
    Object.defineProperty(C, "__esModule", { value: true });
    C.NoticeMessage = C.DataRowMessage = C.CommandCompleteMessage = C.ReadyForQueryMessage = C.NotificationResponseMessage = C.BackendKeyDataMessage = C.AuthenticationMD5Password = C.ParameterStatusMessage = C.ParameterDescriptionMessage = C.RowDescriptionMessage = C.Field = C.CopyResponse = C.CopyDataMessage = C.DatabaseError = C.copyDone = C.emptyQuery = C.replicationStart = C.portalSuspended = C.noData = C.closeComplete = C.bindComplete = C.parseComplete = void 0;
    C.parseComplete = { name: "parseComplete", length: 5 };
    C.bindComplete = { name: "bindComplete", length: 5 };
    C.closeComplete = { name: "closeComplete", length: 5 };
    C.noData = { name: "noData", length: 5 };
    C.portalSuspended = { name: "portalSuspended", length: 5 };
    C.replicationStart = { name: "replicationStart", length: 4 };
    C.emptyQuery = { name: "emptyQuery", length: 4 };
    C.copyDone = { name: "copyDone", length: 4 };
    var Dr = class Dr extends Error {
      constructor(e, t, n) {
        super(
          e
        ), this.length = t, this.name = n;
      }
    };
    a(Dr, "DatabaseError");
    var xr = Dr;
    C.DatabaseError = xr;
    var kr = class kr {
      constructor(e, t) {
        this.length = e, this.chunk = t, this.name = "copyData";
      }
    };
    a(kr, "CopyDataMessage");
    var vr = kr;
    C.CopyDataMessage = vr;
    var Ur = class Ur {
      constructor(e, t, n, i) {
        this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
      }
    };
    a(Ur, "CopyResponse");
    var Er = Ur;
    C.CopyResponse = Er;
    var Or = class Or {
      constructor(e, t, n, i, s, o, u) {
        this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
      }
    };
    a(Or, "Field");
    var _r = Or;
    C.Field = _r;
    var qr = class qr {
      constructor(e, t) {
        this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
          this.fieldCount
        );
      }
    };
    a(qr, "RowDescriptionMessage");
    var Ar = qr;
    C.RowDescriptionMessage = Ar;
    var Nr = class Nr {
      constructor(e, t) {
        this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    a(Nr, "ParameterDescriptionMessage");
    var Cr = Nr;
    C.ParameterDescriptionMessage = Cr;
    var Qr = class Qr {
      constructor(e, t, n) {
        this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
      }
    };
    a(Qr, "ParameterStatusMessage");
    var Ir = Qr;
    C.ParameterStatusMessage = Ir;
    var Wr = class Wr {
      constructor(e, t) {
        this.length = e, this.salt = t, this.name = "authenticationMD5Password";
      }
    };
    a(Wr, "AuthenticationMD5Password");
    var Tr = Wr;
    C.AuthenticationMD5Password = Tr;
    var jr = class jr {
      constructor(e, t, n) {
        this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
      }
    };
    a(
      jr,
      "BackendKeyDataMessage"
    );
    var Pr = jr;
    C.BackendKeyDataMessage = Pr;
    var Hr = class Hr {
      constructor(e, t, n, i) {
        this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
      }
    };
    a(Hr, "NotificationResponseMessage");
    var Br = Hr;
    C.NotificationResponseMessage = Br;
    var Gr = class Gr {
      constructor(e, t) {
        this.length = e, this.status = t, this.name = "readyForQuery";
      }
    };
    a(Gr, "ReadyForQueryMessage");
    var Lr = Gr;
    C.ReadyForQueryMessage = Lr;
    var $r = class $r {
      constructor(e, t) {
        this.length = e, this.text = t, this.name = "commandComplete";
      }
    };
    a($r, "CommandCompleteMessage");
    var Rr = $r;
    C.CommandCompleteMessage = Rr;
    var Vr = class Vr {
      constructor(e, t) {
        this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
      }
    };
    a(Vr, "DataRowMessage");
    var Fr = Vr;
    C.DataRowMessage = Fr;
    var Kr = class Kr {
      constructor(e, t) {
        this.length = e, this.message = t, this.name = "notice";
      }
    };
    a(Kr, "NoticeMessage");
    var Mr = Kr;
    C.NoticeMessage = Mr;
  });
  var ms = I((bt) => {
    "use strict";
    p();
    Object.defineProperty(bt, "__esModule", { value: true });
    bt.Writer = void 0;
    var Zr = class Zr {
      constructor(e = 256) {
        this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e);
      }
      ensure(e) {
        var t = this.buffer.length - this.offset;
        if (t < e) {
          var n = this.buffer, i = n.length + (n.length >> 1) + e;
          this.buffer = d.allocUnsafe(
            i
          ), n.copy(this.buffer);
        }
      }
      addInt32(e) {
        return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
      }
      addInt16(e) {
        return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
      }
      addCString(e) {
        if (!e)
          this.ensure(1);
        else {
          var t = d.byteLength(e);
          this.ensure(t + 1), this.buffer.write(
            e,
            this.offset,
            "utf-8"
          ), this.offset += t;
        }
        return this.buffer[this.offset++] = 0, this;
      }
      addString(e = "") {
        var t = d.byteLength(e);
        return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
      }
      add(e) {
        return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
      }
      join(e) {
        if (e) {
          this.buffer[this.headerPosition] = e;
          let t = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(t, this.headerPosition + 1);
        }
        return this.buffer.slice(e ? 0 : 5, this.offset);
      }
      flush(e) {
        var t = this.join(e);
        return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
      }
    };
    a(Zr, "Writer");
    var Yr = Zr;
    bt.Writer = Yr;
  });
  var ws = I((xt) => {
    "use strict";
    p();
    Object.defineProperty(xt, "__esModule", { value: true });
    xt.serialize = void 0;
    var Jr = ms(), M = new Jr.Writer(), ku = a((r) => {
      M.addInt16(3).addInt16(
        0
      );
      for (let n of Object.keys(r))
        M.addCString(n).addCString(r[n]);
      M.addCString("client_encoding").addCString("UTF8");
      var e = M.addCString("").flush(), t = e.length + 4;
      return new Jr.Writer().addInt32(t).add(e).flush();
    }, "startup"), Uu = a(() => {
      let r = d.allocUnsafe(8);
      return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
    }, "requestSsl"), Ou = a((r) => M.addCString(r).flush(112), "password"), qu = a(function(r, e) {
      return M.addCString(r).addInt32(
        d.byteLength(e)
      ).addString(e), M.flush(112);
    }, "sendSASLInitialResponseMessage"), Nu = a(
      function(r) {
        return M.addString(r).flush(112);
      },
      "sendSCRAMClientFinalMessage"
    ), Qu = a(
      (r) => M.addCString(r).flush(81),
      "query"
    ), gs = [], Wu = a((r) => {
      let e = r.name || "";
      e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
      let t = r.types || gs;
      for (var n = t.length, i = M.addCString(e).addCString(r.text).addInt16(n), s = 0; s < n; s++)
        i.addInt32(t[s]);
      return M.flush(80);
    }, "parse"), Oe = new Jr.Writer(), ju = a(function(r, e) {
      for (let t = 0; t < r.length; t++) {
        let n = e ? e(r[t], t) : r[t];
        n == null ? (M.addInt16(0), Oe.addInt32(-1)) : n instanceof d ? (M.addInt16(1), Oe.addInt32(n.length), Oe.add(n)) : (M.addInt16(0), Oe.addInt32(d.byteLength(
          n
        )), Oe.addString(n));
      }
    }, "writeValues"), Hu = a((r = {}) => {
      let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || gs, s = i.length;
      return M.addCString(e).addCString(t), M.addInt16(s), ju(i, r.valueMapper), M.addInt16(s), M.add(Oe.flush()), M.addInt16(n ? 1 : 0), M.flush(66);
    }, "bind"), Gu = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), $u = a((r) => {
      if (!r || !r.portal && !r.rows)
        return Gu;
      let e = r.portal || "", t = r.rows || 0, n = d.byteLength(e), i = 4 + n + 1 + 4, s = d.allocUnsafe(1 + i);
      return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
    }, "execute"), Vu = a((r, e) => {
      let t = d.allocUnsafe(16);
      return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
        r,
        8
      ), t.writeInt32BE(e, 12), t;
    }, "cancel"), Xr = a(
      (r, e) => {
        let n = 4 + d.byteLength(e) + 1, i = d.allocUnsafe(1 + n);
        return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
      },
      "cstringMessage"
    ), Ku = M.addCString("P").flush(68), zu = M.addCString("S").flush(68), Yu = a((r) => r.name ? Xr(68, `${r.type}${r.name || ""}`) : r.type === "P" ? Ku : zu, "describe"), Zu = a(
      (r) => {
        let e = `${r.type}${r.name || ""}`;
        return Xr(67, e);
      },
      "close"
    ), Ju = a((r) => M.add(r).flush(
      100
    ), "copyData"), Xu = a((r) => Xr(102, r), "copyFail"), St = a((r) => d.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), ec = St(72), tc = St(83), rc = St(88), nc = St(99), ic = {
      startup: ku,
      password: Ou,
      requestSsl: Uu,
      sendSASLInitialResponseMessage: qu,
      sendSCRAMClientFinalMessage: Nu,
      query: Qu,
      parse: Wu,
      bind: Hu,
      execute: $u,
      describe: Yu,
      close: Zu,
      flush: () => ec,
      sync: () => tc,
      end: () => rc,
      copyData: Ju,
      copyDone: () => nc,
      copyFail: Xu,
      cancel: Vu
    };
    xt.serialize = ic;
  });
  var bs = I((vt) => {
    "use strict";
    p();
    Object.defineProperty(vt, "__esModule", { value: true });
    vt.BufferReader = void 0;
    var sc = d.allocUnsafe(0), tn = class tn {
      constructor(e = 0) {
        this.offset = e, this.buffer = sc, this.encoding = "utf-8";
      }
      setBuffer(e, t) {
        this.offset = e, this.buffer = t;
      }
      int16() {
        let e = this.buffer.readInt16BE(this.offset);
        return this.offset += 2, e;
      }
      byte() {
        let e = this.buffer[this.offset];
        return this.offset++, e;
      }
      int32() {
        let e = this.buffer.readInt32BE(this.offset);
        return this.offset += 4, e;
      }
      string(e) {
        let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
        return this.offset += e, t;
      }
      cstring() {
        let e = this.offset, t = e;
        for (; this.buffer[t++] !== 0; )
          ;
        return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
      }
      bytes(e) {
        let t = this.buffer.slice(this.offset, this.offset + e);
        return this.offset += e, t;
      }
    };
    a(tn, "BufferReader");
    var en = tn;
    vt.BufferReader = en;
  });
  var Ss = {};
  te(Ss, { default: () => oc });
  var oc;
  var xs = $(() => {
    "use strict";
    p();
    oc = {};
  });
  var _s = I((qe) => {
    "use strict";
    p();
    var ac = qe && qe.__importDefault || function(r) {
      return r && r.__esModule ? r : { default: r };
    };
    Object.defineProperty(qe, "__esModule", { value: true });
    qe.Parser = void 0;
    var D = zr(), uc = bs(), cc = ac((xs(), O(Ss))), rn = 1, hc = 4, vs = rn + hc, Es = d.allocUnsafe(
      0
    ), sn = class sn {
      constructor(e) {
        if (this.buffer = Es, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new uc.BufferReader(), e?.mode === "binary")
          throw new Error("Binary mode not supported yet");
        this.mode = e?.mode || "text";
      }
      parse(e, t) {
        this.mergeBuffer(e);
        let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
        for (; i + vs <= n; ) {
          let s = this.buffer[i], o = this.buffer.readUInt32BE(i + rn), u = rn + o;
          if (u + i <= n) {
            let c = this.handlePacket(
              i + vs,
              s,
              o,
              this.buffer
            );
            t(c), i += u;
          } else
            break;
        }
        i === n ? (this.buffer = Es, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
      }
      mergeBuffer(e) {
        if (this.bufferLength > 0) {
          let t = this.bufferLength + e.byteLength;
          if (t + this.bufferOffset > this.buffer.byteLength) {
            let i;
            if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
              i = this.buffer;
            else {
              let s = this.buffer.byteLength * 2;
              for (; t >= s; )
                s *= 2;
              i = d.allocUnsafe(s);
            }
            this.buffer.copy(i, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = i, this.bufferOffset = 0;
          }
          e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
        } else
          this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
      }
      handlePacket(e, t, n, i) {
        switch (t) {
          case 50:
            return D.bindComplete;
          case 49:
            return D.parseComplete;
          case 51:
            return D.closeComplete;
          case 110:
            return D.noData;
          case 115:
            return D.portalSuspended;
          case 99:
            return D.copyDone;
          case 87:
            return D.replicationStart;
          case 73:
            return D.emptyQuery;
          case 68:
            return this.parseDataRowMessage(e, n, i);
          case 67:
            return this.parseCommandCompleteMessage(
              e,
              n,
              i
            );
          case 90:
            return this.parseReadyForQueryMessage(e, n, i);
          case 65:
            return this.parseNotificationMessage(e, n, i);
          case 82:
            return this.parseAuthenticationResponse(
              e,
              n,
              i
            );
          case 83:
            return this.parseParameterStatusMessage(e, n, i);
          case 75:
            return this.parseBackendKeyData(e, n, i);
          case 69:
            return this.parseErrorMessage(e, n, i, "error");
          case 78:
            return this.parseErrorMessage(e, n, i, "notice");
          case 84:
            return this.parseRowDescriptionMessage(
              e,
              n,
              i
            );
          case 116:
            return this.parseParameterDescriptionMessage(e, n, i);
          case 71:
            return this.parseCopyInMessage(e, n, i);
          case 72:
            return this.parseCopyOutMessage(e, n, i);
          case 100:
            return this.parseCopyData(e, n, i);
          default:
            cc.default.fail(`unknown message code: ${t.toString(16)}`);
        }
      }
      parseReadyForQueryMessage(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.string(1);
        return new D.ReadyForQueryMessage(t, i);
      }
      parseCommandCompleteMessage(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.cstring();
        return new D.CommandCompleteMessage(
          t,
          i
        );
      }
      parseCopyData(e, t, n) {
        let i = n.slice(e, e + (t - 4));
        return new D.CopyDataMessage(
          t,
          i
        );
      }
      parseCopyInMessage(e, t, n) {
        return this.parseCopyMessage(e, t, n, "copyInResponse");
      }
      parseCopyOutMessage(e, t, n) {
        return this.parseCopyMessage(e, t, n, "copyOutResponse");
      }
      parseCopyMessage(e, t, n, i) {
        this.reader.setBuffer(e, n);
        let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new D.CopyResponse(t, i, s, o);
        for (let c = 0; c < o; c++)
          u.columnTypes[c] = this.reader.int16();
        return u;
      }
      parseNotificationMessage(e, t, n) {
        this.reader.setBuffer(
          e,
          n
        );
        let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
        return new D.NotificationResponseMessage(t, i, s, o);
      }
      parseRowDescriptionMessage(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.int16(), s = new D.RowDescriptionMessage(t, i);
        for (let o = 0; o < i; o++)
          s.fields[o] = this.parseField();
        return s;
      }
      parseField() {
        let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
        return new D.Field(e, t, n, i, s, o, u);
      }
      parseParameterDescriptionMessage(e, t, n) {
        this.reader.setBuffer(
          e,
          n
        );
        let i = this.reader.int16(), s = new D.ParameterDescriptionMessage(t, i);
        for (let o = 0; o < i; o++)
          s.dataTypeIDs[o] = this.reader.int32();
        return s;
      }
      parseDataRowMessage(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.int16(), s = new Array(i);
        for (let o = 0; o < i; o++) {
          let u = this.reader.int32();
          s[o] = u === -1 ? null : this.reader.string(u);
        }
        return new D.DataRowMessage(
          t,
          s
        );
      }
      parseParameterStatusMessage(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.cstring(), s = this.reader.cstring();
        return new D.ParameterStatusMessage(t, i, s);
      }
      parseBackendKeyData(e, t, n) {
        this.reader.setBuffer(e, n);
        let i = this.reader.int32(), s = this.reader.int32();
        return new D.BackendKeyDataMessage(t, i, s);
      }
      parseAuthenticationResponse(e, t, n) {
        this.reader.setBuffer(
          e,
          n
        );
        let i = this.reader.int32(), s = { name: "authenticationOk", length: t };
        switch (i) {
          case 0:
            break;
          case 3:
            s.length === 8 && (s.name = "authenticationCleartextPassword");
            break;
          case 5:
            if (s.length === 12) {
              s.name = "authenticationMD5Password";
              let u = this.reader.bytes(4);
              return new D.AuthenticationMD5Password(t, u);
            }
            break;
          case 10:
            s.name = "authenticationSASL", s.mechanisms = [];
            let o;
            do
              o = this.reader.cstring(), o && s.mechanisms.push(o);
            while (o);
            break;
          case 11:
            s.name = "authenticationSASLContinue", s.data = this.reader.string(t - 8);
            break;
          case 12:
            s.name = "authenticationSASLFinal", s.data = this.reader.string(t - 8);
            break;
          default:
            throw new Error("Unknown authenticationOk message type " + i);
        }
        return s;
      }
      parseErrorMessage(e, t, n, i) {
        this.reader.setBuffer(e, n);
        let s = {}, o = this.reader.string(1);
        for (; o !== "\0"; )
          s[o] = this.reader.cstring(), o = this.reader.string(1);
        let u = s.M, c = i === "notice" ? new D.NoticeMessage(
          t,
          u
        ) : new D.DatabaseError(u, t, i);
        return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
      }
    };
    a(sn, "Parser");
    var nn = sn;
    qe.Parser = nn;
  });
  var on = I((Se) => {
    "use strict";
    p();
    Object.defineProperty(Se, "__esModule", { value: true });
    Se.DatabaseError = Se.serialize = Se.parse = void 0;
    var lc = zr();
    Object.defineProperty(
      Se,
      "DatabaseError",
      { enumerable: true, get: function() {
        return lc.DatabaseError;
      } }
    );
    var fc = ws();
    Object.defineProperty(Se, "serialize", { enumerable: true, get: function() {
      return fc.serialize;
    } });
    var pc = _s();
    function dc(r, e) {
      let t = new pc.Parser();
      return r.on("data", (n) => t.parse(
        n,
        e
      )), new Promise((n) => r.on("end", () => n()));
    }
    a(dc, "parse");
    Se.parse = dc;
  });
  var As = {};
  te(As, { connect: () => yc });
  function yc({ socket: r, servername: e }) {
    return r.startTls(e), r;
  }
  var Cs = $(() => {
    "use strict";
    p();
    a(yc, "connect");
  });
  var cn = I((sf, Ps) => {
    "use strict";
    p();
    var Is = (wt(), O(ys)), mc = we().EventEmitter, {
      parse: gc,
      serialize: Q
    } = on(), Ts = Q.flush(), wc = Q.sync(), bc = Q.end(), un = class un extends mc {
      constructor(e) {
        super(), e = e || {}, this.stream = e.stream || new Is.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
        var t = this;
        this.on("newListener", function(n) {
          n === "message" && (t._emitMessage = true);
        });
      }
      connect(e, t) {
        var n = this;
        this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
          e,
          t
        ), this.stream.once("connect", function() {
          n._keepAlive && n.stream.setKeepAlive(
            true,
            n._keepAliveInitialDelayMillis
          ), n.emit("connect");
        });
        let i = a(function(s) {
          n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
        }, "reportStreamError");
        if (this.stream.on("error", i), this.stream.on("close", function() {
          n.emit("end");
        }), !this.ssl)
          return this.attachListeners(this.stream);
        this.stream.once("data", function(s) {
          var o = s.toString("utf8");
          switch (o) {
            case "S":
              break;
            case "N":
              return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
            default:
              return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          var u = (Cs(), O(As));
          let c = { socket: n.stream };
          n.ssl !== true && (Object.assign(
            c,
            n.ssl
          ), "key" in n.ssl && (c.key = n.ssl.key)), Is.isIP(t) === 0 && (c.servername = t);
          try {
            n.stream = u.connect(c);
          } catch (h) {
            return n.emit("error", h);
          }
          n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
        });
      }
      attachListeners(e) {
        e.on("end", () => {
          this.emit("end");
        }), gc(e, (t) => {
          var n = t.name === "error" ? "errorMessage" : t.name;
          this._emitMessage && this.emit("message", t), this.emit(n, t);
        });
      }
      requestSsl() {
        this.stream.write(Q.requestSsl());
      }
      startup(e) {
        this.stream.write(Q.startup(e));
      }
      cancel(e, t) {
        this._send(Q.cancel(e, t));
      }
      password(e) {
        this._send(Q.password(e));
      }
      sendSASLInitialResponseMessage(e, t) {
        this._send(Q.sendSASLInitialResponseMessage(
          e,
          t
        ));
      }
      sendSCRAMClientFinalMessage(e) {
        this._send(Q.sendSCRAMClientFinalMessage(e));
      }
      _send(e) {
        return this.stream.writable ? this.stream.write(e) : false;
      }
      query(e) {
        this._send(Q.query(
          e
        ));
      }
      parse(e) {
        this._send(Q.parse(e));
      }
      bind(e) {
        this._send(Q.bind(e));
      }
      execute(e) {
        this._send(Q.execute(e));
      }
      flush() {
        this.stream.writable && this.stream.write(Ts);
      }
      sync() {
        this._ending = true, this._send(Ts), this._send(wc);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        if (this._ending = true, !this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(bc, () => {
          this.stream.end();
        });
      }
      close(e) {
        this._send(Q.close(e));
      }
      describe(e) {
        this._send(Q.describe(e));
      }
      sendCopyFromChunk(e) {
        this._send(Q.copyData(e));
      }
      endCopyFrom() {
        this._send(Q.copyDone());
      }
      sendCopyFail(e) {
        this._send(Q.copyFail(e));
      }
    };
    a(un, "Connection");
    var an = un;
    Ps.exports = an;
  });
  var Rs = I((cf, Ls) => {
    "use strict";
    p();
    var Sc = we().EventEmitter, uf = (Ge(), O(He)), xc = tt(), hn = Ni(), vc = Zi(), Ec = hr(), _c = gt(), Bs = ps(), Ac = et(), Cc = cn(), ln = class ln extends Sc {
      constructor(e) {
        super(), this.connectionParameters = new _c(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
        var t = e || {};
        this._Promise = t.Promise || b.Promise, this._types = new Ec(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new Cc({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || Ac.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
      }
      _errorAllQueries(e) {
        let t = a(
          (n) => {
            m.nextTick(() => {
              n.handleError(e, this.connection);
            });
          },
          "enqueueError"
        );
        this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
      }
      _connect(e) {
        var t = this, n = this.connection;
        if (this._connectionCallback = e, this._connecting || this._connected) {
          let i = new Error("Client has already been connected. You cannot reuse a client.");
          m.nextTick(() => {
            e(i);
          });
          return;
        }
        this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
          n._ending = true, n.stream.destroy(new Error("timeout expired"));
        }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
          t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
        }), n.on("sslconnect", function() {
          n.startup(t.getStartupConf());
        }), this._attachListeners(n), n.once("end", () => {
          let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
            i
          )), m.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(e) {
        if (e) {
          this._connect(e);
          return;
        }
        return new this._Promise((t, n) => {
          this._connect((i) => {
            i ? n(i) : t();
          });
        });
      }
      _attachListeners(e) {
        e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
          "errorMessage",
          this._handleErrorMessage.bind(this)
        ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
          "emptyQuery",
          this._handleEmptyQuery.bind(this)
        ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
      }
      _checkPgPass(e) {
        let t = this.connection;
        typeof this.password == "function" ? this._Promise.resolve().then(
          () => this.password()
        ).then((n) => {
          if (n !== void 0) {
            if (typeof n != "string") {
              t.emit("error", new TypeError("Password must be a string"));
              return;
            }
            this.connectionParameters.password = this.password = n;
          } else
            this.connectionParameters.password = this.password = null;
          e();
        }).catch((n) => {
          t.emit("error", n);
        }) : this.password !== null ? e() : vc(
          this.connectionParameters,
          (n) => {
            n !== void 0 && (this.connectionParameters.password = this.password = n), e();
          }
        );
      }
      _handleAuthCleartextPassword(e) {
        this._checkPgPass(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(e) {
        this._checkPgPass(() => {
          let t = xc.postgresMd5PasswordHash(
            this.user,
            this.password,
            e.salt
          );
          this.connection.password(t);
        });
      }
      _handleAuthSASL(e) {
        this._checkPgPass(() => {
          this.saslSession = hn.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
            this.saslSession.mechanism,
            this.saslSession.response
          );
        });
      }
      _handleAuthSASLContinue(e) {
        hn.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
          this.saslSession.response
        );
      }
      _handleAuthSASLFinal(e) {
        hn.finalizeSession(
          this.saslSession,
          e.data
        ), this.saslSession = null;
      }
      _handleBackendKeyData(e) {
        this.processID = e.processID, this.secretKey = e.secretKey;
      }
      _handleReadyForQuery(e) {
        this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
        let { activeQuery: t } = this;
        this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
      }
      _handleErrorWhileConnecting(e) {
        if (!this._connectionError) {
          if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback)
            return this._connectionCallback(e);
          this.emit("error", e);
        }
      }
      _handleErrorEvent(e) {
        if (this._connecting)
          return this._handleErrorWhileConnecting(e);
        this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
      }
      _handleErrorMessage(e) {
        if (this._connecting)
          return this._handleErrorWhileConnecting(e);
        let t = this.activeQuery;
        if (!t) {
          this._handleErrorEvent(
            e
          );
          return;
        }
        this.activeQuery = null, t.handleError(e, this.connection);
      }
      _handleRowDescription(e) {
        this.activeQuery.handleRowDescription(e);
      }
      _handleDataRow(e) {
        this.activeQuery.handleDataRow(
          e
        );
      }
      _handlePortalSuspended(e) {
        this.activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(e) {
        this.activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(e) {
        this.activeQuery.handleCommandComplete(e, this.connection);
      }
      _handleParseComplete(e) {
        this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
      }
      _handleCopyInResponse(e) {
        this.activeQuery.handleCopyInResponse(
          this.connection
        );
      }
      _handleCopyData(e) {
        this.activeQuery.handleCopyData(e, this.connection);
      }
      _handleNotification(e) {
        this.emit("notification", e);
      }
      _handleNotice(e) {
        this.emit("notice", e);
      }
      getStartupConf() {
        var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
        return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
          e.statement_timeout,
          10
        ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
          e.idle_in_transaction_session_timeout,
          10
        ))), e.options && (t.options = e.options), t;
      }
      cancel(e, t) {
        if (e.activeQuery === t) {
          var n = this.connection;
          this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
            n.cancel(
              e.processID,
              e.secretKey
            );
          });
        } else
          e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
      }
      setTypeParser(e, t, n) {
        return this._types.setTypeParser(e, t, n);
      }
      getTypeParser(e, t) {
        return this._types.getTypeParser(e, t);
      }
      escapeIdentifier(e) {
        return '"' + e.replace(
          /"/g,
          '""'
        ) + '"';
      }
      escapeLiteral(e) {
        for (var t = false, n = "'", i = 0; i < e.length; i++) {
          var s = e[i];
          s === "'" ? n += s + s : s === "\\" ? (n += s + s, t = true) : n += s;
        }
        return n += "'", t === true && (n = " E" + n), n;
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true)
          if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
            this.readyForQuery = false, this.hasExecuted = true;
            let e = this.activeQuery.submit(this.connection);
            e && m.nextTick(() => {
              this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
            });
          } else
            this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
      }
      query(e, t, n) {
        var i, s, o, u, c;
        if (e == null)
          throw new TypeError("Client was passed a null or undefined query");
        return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Bs(
          e,
          t,
          n
        ), i.callback || (s = new this._Promise((h, l) => {
          i.callback = (y, x) => y ? l(y) : h(x);
        }))), o && (c = i.callback, u = setTimeout(() => {
          var h = new Error("Query read timeout");
          m.nextTick(
            () => {
              i.handleError(h, this.connection);
            }
          ), c(h), i.callback = () => {
          };
          var l = this.queryQueue.indexOf(i);
          l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
        }, o), i.callback = (h, l) => {
          clearTimeout(u), c(h, l);
        }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
          i.handleError(
            new Error("Client was closed and is not queryable"),
            this.connection
          );
        }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m.nextTick(
          () => {
            i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          }
        ), s);
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      end(e) {
        if (this._ending = true, !this.connection._connecting)
          if (e)
            e();
          else
            return this._Promise.resolve();
        if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e)
          this.connection.once("end", e);
        else
          return new this._Promise((t) => {
            this.connection.once("end", t);
          });
      }
    };
    a(ln, "Client");
    var Et = ln;
    Et.Query = Bs;
    Ls.exports = Et;
  });
  var ks = I((ff, Ds) => {
    "use strict";
    p();
    var Ic = we().EventEmitter, Fs = a(function() {
    }, "NOOP"), Ms = a(
      (r, e) => {
        let t = r.findIndex(e);
        return t === -1 ? void 0 : r.splice(t, 1)[0];
      },
      "removeWhere"
    ), dn = class dn {
      constructor(e, t, n) {
        this.client = e, this.idleListener = t, this.timeoutId = n;
      }
    };
    a(dn, "IdleItem");
    var fn = dn, yn = class yn {
      constructor(e) {
        this.callback = e;
      }
    };
    a(yn, "PendingItem");
    var Ne = yn;
    function Tc() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    a(Tc, "throwOnDoubleRelease");
    function _t(r, e) {
      if (e)
        return { callback: e, result: void 0 };
      let t, n, i = a(function(o, u) {
        o ? t(o) : n(u);
      }, "cb"), s = new r(function(o, u) {
        n = o, t = u;
      }).catch((o) => {
        throw Error.captureStackTrace(
          o
        ), o;
      });
      return { callback: i, result: s };
    }
    a(_t, "promisify");
    function Pc(r, e) {
      return a(
        function t(n) {
          n.client = e, e.removeListener("error", t), e.on("error", () => {
            r.log("additional client error after disconnection due to error", n);
          }), r._remove(e), r.emit("error", n, e);
        },
        "idleListener"
      );
    }
    a(Pc, "makeIdleListener");
    var mn = class mn extends Ic {
      constructor(e, t) {
        super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
          this.options,
          "password",
          { configurable: true, enumerable: false, writable: true, value: e.password }
        ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
        }, this.Client = this.options.Client || t || At().Client, this.Promise = this.options.Promise || b.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _pulseQueue() {
        if (this.log("pulse queue"), this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log(
            "pulse queue on ending"
          ), this._idle.length && this._idle.slice().map((t) => {
            this._remove(
              t.client
            );
          }), this._clients.length || (this.ended = true, this._endCallback());
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull())
          return;
        let e = this._pendingQueue.shift();
        if (this._idle.length) {
          let t = this._idle.pop();
          clearTimeout(t.timeoutId);
          let n = t.client;
          n.ref && n.ref();
          let i = t.idleListener;
          return this._acquireClient(n, e, i, false);
        }
        if (!this._isFull())
          return this.newClient(e);
        throw new Error("unexpected condition");
      }
      _remove(e) {
        let t = Ms(this._idle, (n) => n.client === e);
        t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
      }
      connect(e) {
        if (this.ending) {
          let i = new Error("Cannot use a pool after calling end on the pool");
          return e ? e(i) : this.Promise.reject(
            i
          );
        }
        let t = _t(this.Promise, e), n = t.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
            return this._pendingQueue.push(new Ne(t.callback)), n;
          let i = a((u, c, h) => {
            clearTimeout(
              o
            ), t.callback(u, c, h);
          }, "queueCallback"), s = new Ne(i), o = setTimeout(() => {
            Ms(
              this._pendingQueue,
              (u) => u.callback === i
            ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          return this._pendingQueue.push(s), n;
        }
        return this.newClient(new Ne(t.callback)), n;
      }
      newClient(e) {
        let t = new this.Client(this.options);
        this._clients.push(t);
        let n = Pc(this, t);
        this.log("checking client timeout");
        let i, s = false;
        this.options.connectionTimeoutMillis && (i = setTimeout(() => {
          this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
        }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
          if (i && clearTimeout(i), t.on("error", n), o)
            this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
              o,
              void 0,
              Fs
            );
          else {
            if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
              let u = setTimeout(() => {
                this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                  t,
                  new Ne((h, l, y) => y()),
                  n,
                  false
                );
              }, this.options.maxLifetimeSeconds * 1e3);
              u.unref(), t.once(
                "end",
                () => clearTimeout(u)
              );
            }
            return this._acquireClient(t, e, n, true);
          }
        });
      }
      _acquireClient(e, t, n, i) {
        i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
          e,
          e.release
        ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
          if (s)
            return e.release(s), t.callback(s, void 0, Fs);
          t.callback(void 0, e, e.release);
        }) : t.callback(
          void 0,
          e,
          e.release
        );
      }
      _releaseOnce(e, t) {
        let n = false;
        return (i) => {
          n && Tc(), n = true, this._release(
            e,
            t,
            i
          );
        };
      }
      _release(e, t, n) {
        if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
          e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
          return;
        }
        if (this._expired.has(e)) {
          this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
          return;
        }
        let s;
        this.options.idleTimeoutMillis && (s = setTimeout(() => {
          this.log("remove idle client"), this._remove(e);
        }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new fn(e, t, s)), this._pulseQueue();
      }
      query(e, t, n) {
        if (typeof e == "function") {
          let s = _t(this.Promise, e);
          return S(function() {
            return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          }), s.result;
        }
        typeof t == "function" && (n = t, t = void 0);
        let i = _t(this.Promise, n);
        return n = i.callback, this.connect((s, o) => {
          if (s)
            return n(s);
          let u = false, c = a((h) => {
            u || (u = true, o.release(h), n(h));
          }, "onError");
          o.once("error", c), this.log("dispatching query");
          try {
            o.query(e, t, (h, l) => {
              if (this.log("query dispatched"), o.removeListener("error", c), !u)
                return u = true, o.release(h), h ? n(h) : n(
                  void 0,
                  l
                );
            });
          } catch (h) {
            return o.release(h), n(h);
          }
        }), i.result;
      }
      end(e) {
        if (this.log("ending"), this.ending) {
          let n = new Error("Called end on pool more than once");
          return e ? e(n) : this.Promise.reject(n);
        }
        this.ending = true;
        let t = _t(this.Promise, e);
        return this._endCallback = t.callback, this._pulseQueue(), t.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    a(mn, "Pool");
    var pn = mn;
    Ds.exports = pn;
  });
  var Us = {};
  te(Us, { default: () => Bc });
  var Bc;
  var Os = $(() => {
    "use strict";
    p();
    Bc = {};
  });
  var qs = I((mf, Lc) => {
    Lc.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
      "database",
      "libpq",
      "pg",
      "postgre",
      "postgres",
      "postgresql",
      "rdbms"
    ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
      "buffer-writer": "2.0.0",
      "packet-reader": "1.0.0",
      "pg-connection-string": "^2.5.0",
      "pg-pool": "^3.5.2",
      "pg-protocol": "^1.5.0",
      "pg-types": "^2.1.0",
      pgpass: "1.x"
    }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
      "pg-native": { optional: true }
    }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
  });
  var Ws = I((gf, Qs) => {
    "use strict";
    p();
    var Ns = we().EventEmitter, Rc = (Ge(), O(He)), gn = tt(), Qe = Qs.exports = function(r, e, t) {
      Ns.call(this), r = gn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
        n === "row" && (this._emitRowEvents = true);
      }.bind(this));
    };
    Rc.inherits(
      Qe,
      Ns
    );
    var Fc = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
    Qe.prototype.handleError = function(r) {
      var e = this.native.pq.resultErrorFields();
      if (e)
        for (var t in e) {
          var n = Fc[t] || t;
          r[n] = e[t];
        }
      this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
    };
    Qe.prototype.then = function(r, e) {
      return this._getPromise().then(r, e);
    };
    Qe.prototype.catch = function(r) {
      return this._getPromise().catch(r);
    };
    Qe.prototype._getPromise = function() {
      return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
        this._once("end", r), this._once(
          "error",
          e
        );
      }.bind(this)), this._promise);
    };
    Qe.prototype.submit = function(r) {
      this.state = "running";
      var e = this;
      this.native = r.native, r.native.arrayMode = this._arrayMode;
      var t = a(
        function(s, o, u) {
          if (r.native.arrayMode = false, S(function() {
            e.emit("_done");
          }), s)
            return e.handleError(s);
          e._emitRowEvents && (u.length > 1 ? o.forEach((c, h) => {
            c.forEach((l) => {
              e.emit(
                "row",
                l,
                u[h]
              );
            });
          }) : o.forEach(function(c) {
            e.emit("row", c, u);
          })), e.state = "end", e.emit(
            "end",
            u
          ), e.callback && e.callback(null, u);
        },
        "after"
      );
      if (m.domain && (t = m.domain.bind(
        t
      )), this.name) {
        this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
          "You supplied %s (%s)",
          this.name,
          this.name.length
        ), console.error("This can cause conflicts and silent errors executing queries"));
        var n = (this.values || []).map(gn.prepareValue);
        if (r.namedQueries[this.name]) {
          if (this.text && r.namedQueries[this.name] !== this.text) {
            let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return t(s);
          }
          return r.native.execute(this.name, n, t);
        }
        return r.native.prepare(
          this.name,
          this.text,
          n.length,
          function(s) {
            return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
          }
        );
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          let s = new Error("Query values must be an array");
          return t(s);
        }
        var i = this.values.map(gn.prepareValue);
        r.native.query(this.text, i, t);
      } else
        r.native.query(this.text, t);
    };
  });
  var $s = I((xf, Gs) => {
    "use strict";
    p();
    var Mc = (Os(), O(Us)), Dc = hr(), Sf = qs(), js = we().EventEmitter, kc = (Ge(), O(He)), Uc = gt(), Hs = Ws(), Z = Gs.exports = function(r) {
      js.call(this), r = r || {}, this._Promise = r.Promise || b.Promise, this._types = new Dc(r.types), this.native = new Mc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
      var e = this.connectionParameters = new Uc(
        r
      );
      this.user = e.user, Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e.password
      }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
    };
    Z.Query = Hs;
    kc.inherits(Z, js);
    Z.prototype._errorAllQueries = function(r) {
      let e = a(
        (t) => {
          m.nextTick(() => {
            t.native = this.native, t.handleError(r);
          });
        },
        "enqueueError"
      );
      this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
    };
    Z.prototype._connect = function(r) {
      var e = this;
      if (this._connecting) {
        m.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
        if (t)
          return r(
            t
          );
        e.native.connect(n, function(i) {
          if (i)
            return e.native.end(), r(i);
          e._connected = true, e.native.on("error", function(s) {
            e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
          }), e.native.on("notification", function(s) {
            e.emit("notification", { channel: s.relname, payload: s.extra });
          }), e.emit("connect"), e._pulseQueryQueue(true), r();
        });
      });
    };
    Z.prototype.connect = function(r) {
      if (r) {
        this._connect(r);
        return;
      }
      return new this._Promise(
        (e, t) => {
          this._connect((n) => {
            n ? t(n) : e();
          });
        }
      );
    };
    Z.prototype.query = function(r, e, t) {
      var n, i, s, o, u;
      if (r == null)
        throw new TypeError("Client was passed a null or undefined query");
      if (typeof r.submit == "function")
        s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
      else if (s = this.connectionParameters.query_timeout, n = new Hs(r, e, t), !n.callback) {
        let c, h;
        i = new this._Promise((l, y) => {
          c = l, h = y;
        }), n.callback = (l, y) => l ? h(l) : c(y);
      }
      return s && (u = n.callback, o = setTimeout(() => {
        var c = new Error("Query read timeout");
        m.nextTick(() => {
          n.handleError(c, this.connection);
        }), u(c), n.callback = () => {
        };
        var h = this._queryQueue.indexOf(n);
        h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
      }, s), n.callback = (c, h) => {
        clearTimeout(o), u(c, h);
      }), this._queryable ? this._ending ? (n.native = this.native, m.nextTick(() => {
        n.handleError(
          new Error("Client was closed and is not queryable")
        );
      }), i) : (this._queryQueue.push(
        n
      ), this._pulseQueryQueue(), i) : (n.native = this.native, m.nextTick(() => {
        n.handleError(
          new Error("Client has encountered a connection error and is not queryable")
        );
      }), i);
    };
    Z.prototype.end = function(r) {
      var e = this;
      this._ending = true, this._connected || this.once(
        "connect",
        this.end.bind(this, r)
      );
      var t;
      return r || (t = new this._Promise(function(n, i) {
        r = a((s) => s ? i(s) : n(), "cb");
      })), this.native.end(function() {
        e._errorAllQueries(new Error(
          "Connection terminated"
        )), m.nextTick(() => {
          e.emit("end"), r && r();
        });
      }), t;
    };
    Z.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Z.prototype._pulseQueryQueue = function(r) {
      if (this._connected && !this._hasActiveQuery()) {
        var e = this._queryQueue.shift();
        if (!e) {
          r || this.emit("drain");
          return;
        }
        this._activeQuery = e, e.submit(this);
        var t = this;
        e.once(
          "_done",
          function() {
            t._pulseQueryQueue();
          }
        );
      }
    };
    Z.prototype.cancel = function(r) {
      this._activeQuery === r ? this.native.cancel(function() {
      }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
    };
    Z.prototype.ref = function() {
    };
    Z.prototype.unref = function() {
    };
    Z.prototype.setTypeParser = function(r, e, t) {
      return this._types.setTypeParser(r, e, t);
    };
    Z.prototype.getTypeParser = function(r, e) {
      return this._types.getTypeParser(r, e);
    };
  });
  var wn = I((_f, Vs) => {
    "use strict";
    p();
    Vs.exports = $s();
  });
  var At = I((Cf, nt) => {
    "use strict";
    p();
    var Oc = Rs(), qc = et(), Nc = cn(), Qc = ks(), { DatabaseError: Wc } = on(), jc = a((r) => {
      var e;
      return e = class extends Qc {
        constructor(n) {
          super(n, r);
        }
      }, a(e, "BoundPool"), e;
    }, "poolFactory"), bn = a(function(r) {
      this.defaults = qc, this.Client = r, this.Query = this.Client.Query, this.Pool = jc(this.Client), this._pools = [], this.Connection = Nc, this.types = Xe(), this.DatabaseError = Wc;
    }, "PG");
    typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? nt.exports = new bn(wn()) : (nt.exports = new bn(Oc), Object.defineProperty(nt.exports, "native", { configurable: true, enumerable: false, get() {
      var r = null;
      try {
        r = new bn(wn());
      } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND")
          throw e;
      }
      return Object.defineProperty(nt.exports, "native", { value: r }), r;
    } }));
  });
  p();
  var Ct = We(At());
  wt();
  p();
  fr();
  wt();
  var Ys = We(tt());
  var Sn = class Sn2 extends Error {
    constructor() {
      super(...arguments);
      T(this, "name", "NeonDbError");
      T(this, "code", null);
      T(this, "sourceError");
    }
  };
  a(Sn, "NeonDbError");
  var Ce = Sn;
  var Ks = "transaction() expects an array of queries, or a function returning an array of queries";
  function Zs(r, {
    arrayMode: e,
    fullResults: t,
    fetchOptions: n,
    isolationLevel: i,
    readOnly: s,
    deferrable: o,
    queryCallback: u,
    resultCallback: c
  } = {}) {
    if (!r)
      throw new Error(
        "No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?"
      );
    let h;
    try {
      h = lr(r);
    } catch {
      throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(
        r
      ));
    }
    let { protocol: l, username: y, password: x, hostname: A, port: B, pathname: W } = h;
    if (l !== "postgres:" && l !== "postgresql:" || !y || !x || !A || !W)
      throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
    function J(_, ...w) {
      let P, K;
      if (typeof _ == "string")
        P = _, K = w[1], w = w[0] ?? [];
      else {
        P = "";
        for (let j = 0; j < _.length; j++)
          P += _[j], j < w.length && (P += "$" + (j + 1));
      }
      w = w.map((j) => (0, Ys.prepareValue)(j));
      let k = { query: P, params: w };
      return u && u(k), Hc(
        de,
        k,
        K
      );
    }
    a(J, "resolve"), J.transaction = async (_, w) => {
      if (typeof _ == "function" && (_ = _(J)), !Array.isArray(_))
        throw new Error(Ks);
      _.forEach((k) => {
        if (k[Symbol.toStringTag] !== "NeonQueryPromise")
          throw new Error(Ks);
      });
      let P = _.map((k) => k.parameterizedQuery), K = _.map((k) => k.opts ?? {});
      return de(P, K, w);
    };
    async function de(_, w, P) {
      let {
        fetchEndpoint: K,
        fetchFunction: k
      } = Ae, j = typeof K == "function" ? K(A, B) : K, ce = Array.isArray(_) ? { queries: _ } : _, ee = n ?? {}, R = e ?? false, G = t ?? false, he = i, ye = s, ve = o;
      P !== void 0 && (P.fetchOptions !== void 0 && (ee = { ...ee, ...P.fetchOptions }), P.arrayMode !== void 0 && (R = P.arrayMode), P.fullResults !== void 0 && (G = P.fullResults), P.isolationLevel !== void 0 && (he = P.isolationLevel), P.readOnly !== void 0 && (ye = P.readOnly), P.deferrable !== void 0 && (ve = P.deferrable)), w !== void 0 && !Array.isArray(w) && w.fetchOptions !== void 0 && (ee = { ...ee, ...w.fetchOptions });
      let me = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" };
      Array.isArray(_) && (he !== void 0 && (me["Neon-Batch-Isolation-Level"] = he), ye !== void 0 && (me["Neon-Batch-Read-Only"] = String(ye)), ve !== void 0 && (me["Neon-Batch-Deferrable"] = String(
        ve
      )));
      let se;
      try {
        se = await (k ?? fetch)(j, {
          method: "POST",
          body: JSON.stringify(ce),
          headers: me,
          ...ee
        });
      } catch (oe) {
        let q = new Ce(`Error connecting to database: ${oe.message}`);
        throw q.sourceError = oe, q;
      }
      if (se.ok) {
        let oe = await se.json();
        if (Array.isArray(_)) {
          let q = oe.results;
          if (!Array.isArray(q))
            throw new Ce("Neon internal error: unexpected result format");
          return q.map((X, le) => {
            let _n = w[le] ?? {}, eo = _n.arrayMode ?? R, to = _n.fullResults ?? G;
            return zs(X, { arrayMode: eo, fullResults: to, parameterizedQuery: _[le], resultCallback: c });
          });
        } else {
          let q = w ?? {}, X = q.arrayMode ?? R, le = q.fullResults ?? G;
          return zs(oe, {
            arrayMode: X,
            fullResults: le,
            parameterizedQuery: _,
            resultCallback: c
          });
        }
      } else {
        let { status: oe } = se;
        if (oe === 400) {
          let {
            message: q,
            code: X
          } = await se.json(), le = new Ce(q);
          throw le.code = X, le;
        } else {
          let q = await se.text();
          throw new Ce(`Server error (HTTP status ${oe}): ${q}`);
        }
      }
    }
    return a(de, "execute"), J;
  }
  a(Zs, "neon");
  function Hc(r, e, t) {
    return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t, then: (n, i) => r(e, t).then(n, i), catch: (n) => r(e, t).catch(n), finally: (n) => r(e, t).finally(n) };
  }
  a(Hc, "createNeonQueryPromise");
  function zs(r, {
    arrayMode: e,
    fullResults: t,
    parameterizedQuery: n,
    resultCallback: i
  }) {
    let s = r.fields.map((c) => c.name), o = r.fields.map((c) => xe.types.getTypeParser(c.dataTypeID)), u = e === true ? r.rows.map((c) => c.map((h, l) => h === null ? null : o[l](h))) : r.rows.map((c) => Object.fromEntries(
      c.map((h, l) => [s[l], h === null ? null : o[l](h)])
    ));
    return i && i(n, r, u, { arrayMode: e, fullResults: t }), t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = u, r) : u;
  }
  a(zs, "processQueryResult");
  var Xs = We(gt());
  var xe = We(At());
  var vn = class vn2 extends Ct.Client {
    constructor(t) {
      super(t);
      this.config = t;
    }
    get neonConfig() {
      return this.connection.stream;
    }
    connect(t) {
      let { neonConfig: n } = this;
      n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
      let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s = m.env.USER ?? m.env.USERNAME;
      if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null)
        throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
      let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
      if (!u && !n.pipelineConnect)
        return o;
      let h = this.connection;
      if (u && h.on("connect", () => h.stream.emit("data", "S")), c) {
        h.removeAllListeners(
          "authenticationCleartextPassword"
        ), h.removeAllListeners("readyForQuery"), h.once(
          "readyForQuery",
          () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
        );
        let l = this.ssl ? "sslconnect" : "connect";
        h.on(l, () => {
          this._handleAuthCleartextPassword(), this._handleReadyForQuery();
        });
      }
      return o;
    }
    async _handleAuthSASLContinue(t) {
      let n = this.saslSession, i = this.password, s = t.data;
      if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string")
        throw new Error("SASL: protocol error");
      let o = Object.fromEntries(s.split(",").map((q) => {
        if (!/^.=/.test(q))
          throw new Error("SASL: Invalid attribute pair entry");
        let X = q[0], le = q.substring(2);
        return [X, le];
      })), u = o.r, c = o.s, h = o.i;
      if (!u || !/^[!-+--~]+$/.test(u))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
      if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
      if (!h || !/^[1-9][0-9]*$/.test(h))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
      if (!u.startsWith(n.clientNonce))
        throw new Error(
          "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
        );
      if (u.length === n.clientNonce.length)
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      let l = parseInt(h, 10), y = d.from(c, "base64"), x = new TextEncoder(), A = x.encode(i), B = await g.subtle.importKey("raw", A, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), W = new Uint8Array(await g.subtle.sign("HMAC", B, d.concat([y, d.from(
        [0, 0, 0, 1]
      )]))), J = W;
      for (var de = 0; de < l - 1; de++)
        W = new Uint8Array(await g.subtle.sign(
          "HMAC",
          B,
          W
        )), J = d.from(J.map((q, X) => J[X] ^ W[X]));
      let _ = J, w = await g.subtle.importKey(
        "raw",
        _,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      ), P = new Uint8Array(await g.subtle.sign("HMAC", w, x.encode("Client Key"))), K = await g.subtle.digest(
        "SHA-256",
        P
      ), k = "n=*,r=" + n.clientNonce, j = "r=" + u + ",s=" + c + ",i=" + l, ce = "c=biws,r=" + u, ee = k + "," + j + "," + ce, R = await g.subtle.importKey(
        "raw",
        K,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      );
      var G = new Uint8Array(await g.subtle.sign("HMAC", R, x.encode(ee))), he = d.from(P.map((q, X) => P[X] ^ G[X])), ye = he.toString("base64");
      let ve = await g.subtle.importKey(
        "raw",
        _,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      ), me = await g.subtle.sign(
        "HMAC",
        ve,
        x.encode("Server Key")
      ), se = await g.subtle.importKey("raw", me, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
      var oe = d.from(await g.subtle.sign(
        "HMAC",
        se,
        x.encode(ee)
      ));
      n.message = "SASLResponse", n.serverSignature = oe.toString("base64"), n.response = ce + ",p=" + ye, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    }
  };
  a(vn, "NeonClient");
  var xn = vn;
  function Gc(r, e) {
    if (e)
      return {
        callback: e,
        result: void 0
      };
    let t, n, i = a(function(o, u) {
      o ? t(o) : n(u);
    }, "cb"), s = new r(function(o, u) {
      n = o, t = u;
    });
    return { callback: i, result: s };
  }
  a(Gc, "promisify");
  var En = class En2 extends Ct.Pool {
    constructor() {
      super(...arguments);
      T(this, "Client", xn);
      T(this, "hasFetchUnsupportedListeners", false);
    }
    on(t, n) {
      return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
    }
    query(t, n, i) {
      if (!Ae.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
        return super.query(t, n, i);
      typeof n == "function" && (i = n, n = void 0);
      let s = Gc(
        this.Promise,
        i
      );
      i = s.callback;
      try {
        let o = new Xs.default(this.options), u = encodeURIComponent, c = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, l = typeof t == "string" ? t : t.text, y = n ?? t.values ?? [];
        Zs(h, { fullResults: true, arrayMode: t.rowMode === "array" })(l, y).then((A) => i(void 0, A)).catch((A) => i(A));
      } catch (o) {
        i(o);
      }
      return s.result;
    }
  };
  a(En, "NeonPool");
  var export_ClientBase = xe.ClientBase;
  var export_Connection = xe.Connection;
  var export_DatabaseError = xe.DatabaseError;
  var export_Query = xe.Query;
  var export_defaults = xe.defaults;
  var export_types = xe.types;

  // src/index.ts
  addEventListener("fetch", (event) => {
    event.respondWith(handleEvent(event));
  });
  async function fetchProductData(client, nazwa) {
    await client.connect();
    const { rows: productRows } = await client.query("SELECT * FROM produkty WHERE nazwa = $1", [nazwa]);
    for (let product of productRows) {
      const { rows: shopRows } = await client.query("SELECT * FROM sklepy WHERE id_sklep = $1", [product.id_sklep]);
      product.shop = shopRows[0];
    }
    await client.end();
    return productRows;
  }
  async function handleEvent(event) {
    const url = new URL(event.request.url);
    const pathname = url.pathname;
    if (pathname.startsWith("/search")) {
      const nazwa = url.searchParams.get("nazwa");
      if (nazwa) {
        const client = new xn(DATABASE_URL);
        const rows = await fetchProductData(client, nazwa);
        return new Response(JSON.stringify(rows), { status: 200 });
      }
    }
    try {
      return await (0, import_kv_asset_handler.getAssetFromKV)(event);
    } catch (e) {
      return new Response(`"${pathname}" not found`, { status: 404, statusText: "not found" });
    }
  }
})();
/*! Bundled license information:

@neondatabase/serverless/index.mjs:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=index.js.map
