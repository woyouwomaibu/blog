<template><h2 id="遇到的情形" tabindex="-1"><a class="header-anchor" href="#遇到的情形" aria-hidden="true">#</a> 遇到的情形</h2>
<p>在公司开发时遇到需要多个git账号配置，例如是github和gitlab之类的，不同的用户连接不同的仓库</p>
<table>
<thead>
<tr>
<th></th>
<th style="text-align:center">github</th>
<th style="text-align:center">gitlab</th>
</tr>
</thead>
<tbody>
<tr>
<td>user</td>
<td style="text-align:center">a</td>
<td style="text-align:center">b</td>
</tr>
<tr>
<td>email</td>
<td style="text-align:center">a@xx.com</td>
<td style="text-align:center">b@xx.com</td>
</tr>
</tbody>
</table>
<h2 id="如何解决" tabindex="-1"><a class="header-anchor" href="#如何解决" aria-hidden="true">#</a> 如何解决</h2>
<h3 id="_1-首先cd到-ssh目录下生成不同的sshkey" tabindex="-1"><a class="header-anchor" href="#_1-首先cd到-ssh目录下生成不同的sshkey" aria-hidden="true">#</a> 1.首先CD到.ssh目录下生成不同的sshkey</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ssh-keygen -t rsa -C <span class="token string">"changeme@xxx.com"</span> -f filename
<span class="token comment">#filename是生成文件的名称,例如可以填写id_ras_github,不加-f filename则会覆盖默认的id_rsa文件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>绑定公钥常规步骤就略过了</p>
<h3 id="_2-配置config文件" tabindex="-1"><a class="header-anchor" href="#_2-配置config文件" aria-hidden="true">#</a> 2.配置config文件</h3>
<p>在.ssh下创建config文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Linux/Mac</span>
<span class="token function">touch</span> config
<span class="token comment"># Windows，NUL大小写不敏感</span>
<span class="token builtin class-name">type</span> nul <span class="token operator">></span> config
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>config内如何配置呢</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Host github.com
HostName github.com
User a
IdentityFile ~/.ssh/id_rsa_github

Host gitlab.mygitlab.com
HostName gitlab.mygitlab.com
User b
IdentityFile ~/.ssh/id_rsa_gitlab
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>Host：仓库网站的别名 ，可以替代 HostName 来使用的别名，比如clone github 上某个仓库,之前的命令为</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:a/xxx.git
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>用Host设置为github后就变成</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github:a/xxx.git
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>为了方便使用还是直接设置成一样比较好</p>
<ul>
<li>HostName：设置域名地址或ip地址</li>
<li>User：仓库网站上的用户名</li>
<li>IdentityFile：输入id_rsa_xxx的目录地址</li>
</ul>
<h3 id="_3-查看是否配置成功" tabindex="-1"><a class="header-anchor" href="#_3-查看是否配置成功" aria-hidden="true">#</a> 3.查看是否配置成功</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> -T git@gitlab
<span class="token function">ssh</span> -T git@github
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_4-切换用户" tabindex="-1"><a class="header-anchor" href="#_4-切换用户" aria-hidden="true">#</a> 4.切换用户</h3>
<p>上一步都成功后，配置就已经基本成功了
可以配置全局默认的用户</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --global user.name a
<span class="token function">git</span> config --global user.email a@xx.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后切换用户的话，在本地仓库根目录下配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --local user.name b
<span class="token function">git</span> config --local user.email b@xx.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>设置好之后可以通过</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --local --list
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看本地仓库的配置信息，此时提交就是你刚才所配置的用户了</p>
<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>
<p>git官网config文档那么一大串真的看得头痛，这是我查阅些许网站后总结的，希望能有所帮助。</p>
</template>
