[{"bookPath":"rpc","title":"Python","titleId":"ref-frontends-rpc-py","hasOtp":true,"hasPageHeader":true},"<div class=\"note\">\n  <p><i id=\"p_0\" class=\"pid\"></i>This frontend library relies on the <a href=\"/rpc/#ref-backends-rpc\">Reach RPC Server</a>.<a href=\"#p_0\" class=\"pid\">0</a></p>\n</div>\n<p>\n  <i id=\"p_1\" class=\"pid\"></i>A <a href=\"https://www.python.org\">Python</a> client library for the\n  <a href=\"/rpc/#ref-backends-rpc\">Reach RPC protocol</a> may be installed by running:<a href=\"#p_1\" class=\"pid\">1</a>\n</p>\n<pre class=\"snippet unnumbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"pip install --upgrade reach-rpc-client\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">$</span><span style=\"color: #24292E\"> pip install </span><span style=\"color: #D73A49\">--</span><span style=\"color: #24292E\">upgrade reach</span><span style=\"color: #D73A49\">-</span><span style=\"color: #24292E\">rpc</span><span style=\"color: #D73A49\">-</span><span style=\"color: #24292E\">client</span></li></ol></pre>\n<p>\n  <i id=\"p_2\" class=\"pid\"></i>Once installed, add the following import line to your Python file which will\n  connect to the <a href=\"/rpc/#ref-backends-rpc\">RPC server</a>:<a href=\"#p_2\" class=\"pid\">2</a>\n</p>\n<pre class=\"snippet unnumbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"from reach_rpc import mk_rpc\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">from</span><span style=\"color: #24292E\"> reach_rpc </span><span style=\"color: #D73A49\">import</span><span style=\"color: #24292E\"> mk_rpc</span></li></ol></pre>\n<p><i id=\"p_3\" class=\"pid\"></i>The library provides the following bindings:<a href=\"#p_3\" class=\"pid\">3</a></p>\n<hr>\n<p><span class=\"ref\" id=\"py_mk_rpc\" data-scope=\"py\" data-symbol=\"mk_rpc\"></span></p>\n<pre class=\"snippet unnumbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"rpc, rpc_callbacks = mk_rpc(opts)\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #24292E\">rpc, rpc_callbacks </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> mk_rpc(opts)</span></li></ol></pre>\n<p><i id=\"p_4\" class=\"pid\"></i><span class=\"snip\"><span style=\"color: #24292E\">mk_rpc</span></span> accepts the <a href=\"/rpc/#ref-backends-rpc-opts\">Reach RPC Client Standard Options</a> as a dictionary and returns two functions, traditionally called <span class=\"snip\"><span style=\"color: #24292E\">rpc</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">rpc_callbacks</span></span>.<a href=\"#p_4\" class=\"pid\">4</a></p>\n<p>\n  <i id=\"p_5\" class=\"pid\"></i><span class=\"ref\" id=\"py_rpc\" data-scope=\"py\" data-symbol=\"rpc\"></span><span class=\"snip\"><span style=\"color: #24292E\">rpc</span></span> is a function that invokes a synchronous value RPC method.\n  It takes a string, naming the RPC method, and some JSON values to provide as arguments.\n  It returns a single JSON value as the result.<a href=\"#p_5\" class=\"pid\">5</a>\n</p>\n<p><i id=\"p_6\" class=\"pid\"></i>For example,<a href=\"#p_6\" class=\"pid\">6</a></p>\n<pre class=\"snippet unnumbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"rpc('/stdlib/formatCurrency', i, 4)\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #24292E\">rpc(</span><span style=\"color: #032F62\">'/stdlib/formatCurrency'</span><span style=\"color: #24292E\">, i, </span><span style=\"color: #005CC5\">4</span><span style=\"color: #24292E\">)</span></li></ol></pre>\n<p><i id=\"p_7\" class=\"pid\"></i>calls <span class=\"snip\"><span style=\"color: #24292E\">formatCurrency</span></span> with some value <span class=\"snip\"><span style=\"color: #24292E\">i</span></span> and <span class=\"snip\"><span style=\"color: #005CC5\">4</span></span>.<a href=\"#p_7\" class=\"pid\">7</a></p>\n<p>\n  <i id=\"p_8\" class=\"pid\"></i><span class=\"ref\" id=\"py_rpc_callbacks\" data-scope=\"py\" data-symbol=\"rpc_callbacks\"></span><span class=\"snip\"><span style=\"color: #24292E\">rpc_callbacks</span></span> is a function that invokes an interactive RPC method, such as for a backend.\n  It takes a string, naming the RPC method, a JSON value as an argument,\n  and dictionary from strings to JSON values or functions.\n  The functions will be provided as interactive RPC callbacks to the\n  RPC method and should expect JSON values as arguments and return a JSON\n  value as a result.\n  It does not return a value.<a href=\"#p_8\" class=\"pid\">8</a>\n</p>\n<p><i id=\"p_9\" class=\"pid\"></i>For example,<a href=\"#p_9\" class=\"pid\">9</a></p>\n<pre class=\"snippet numbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"def showX(x):\n    print('Alice saw that X is %s'\n          % rpc('/stdlib/bigNumberToNumber', x))\n\nms = { 'price': 10,\n       'showX': showX,\n     }\nrpc_callbacks(&quot;/backend/Alice&quot;, ctc, ms)\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">def</span><span style=\"color: #24292E\"> </span><span style=\"color: #6F42C1\">showX</span><span style=\"color: #24292E\">(x):</span></li><li value=\"2\"><span style=\"color: #24292E\">    </span><span style=\"color: #005CC5\">print</span><span style=\"color: #24292E\">(</span><span style=\"color: #032F62\">'Alice saw that X is </span><span style=\"color: #005CC5\">%s</span><span style=\"color: #032F62\">'</span></li><li value=\"3\"><span style=\"color: #24292E\">          </span><span style=\"color: #D73A49\">%</span><span style=\"color: #24292E\"> rpc(</span><span style=\"color: #032F62\">'/stdlib/bigNumberToNumber'</span><span style=\"color: #24292E\">, x))</span></li><li value=\"4\"></li><li value=\"5\"><span style=\"color: #24292E\">ms </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> { </span><span style=\"color: #032F62\">'price'</span><span style=\"color: #24292E\">: </span><span style=\"color: #005CC5\">10</span><span style=\"color: #24292E\">,</span></li><li value=\"6\"><span style=\"color: #24292E\">       </span><span style=\"color: #032F62\">'showX'</span><span style=\"color: #24292E\">: showX,</span></li><li value=\"7\"><span style=\"color: #24292E\">     }</span></li><li value=\"8\"><span style=\"color: #24292E\">rpc_callbacks(</span><span style=\"color: #032F62\">\"/backend/Alice\"</span><span style=\"color: #24292E\">, ctc, ms)</span></li></ol></pre>\n<p><i id=\"p_10\" class=\"pid\"></i>calls a backend named <code>Alice</code> with the contract <span class=\"snip\"><span style=\"color: #24292E\">ctc</span></span> and a value named <code>price</code> and a method named <code>showX</code> that prints out a result from the Reach backend.<a href=\"#p_10\" class=\"pid\">10</a></p>","<ul><li class=\"dynamic\"><a href=\"#ref-frontends-rpc-py\">Python</a></li></ul>"]