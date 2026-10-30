const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".catalog-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === filter));
    cards.forEach((card) => {
      card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category);
    });
  });
});

const loopSteps = document.querySelectorAll(".loop-step");
loopSteps.forEach((step) => {
  step.addEventListener("click", () => {
    loopSteps.forEach((item) => item.classList.remove("active"));
    step.classList.add("active");
  });
  });

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      const link = card.querySelector("h3 a");
      if (link) window.location.href = link.href;
    });
  });

  const tools = [
    {id:"codex", name:"OpenAI Codex", category:"coding", type:"Hosted coding agent", summary:"Best for delegating repository tasks that need a clean worktree, shell access, tests, and a reviewable patch.", strengths:["Strong software-engineering loop","Good fit for parallel background tasks","Clear handoff through diffs and tests"], weaknesses:["Cloud workflow can feel less immediate than a terminal agent","Cost depends on plan, limits, and model usage","Needs careful permissions for production repos"], quality:"High for scoped code changes; strongest when the issue includes tests and acceptance criteria.", popularity:"Very high · major vendor ecosystem and broad developer awareness", price:"Subscription access varies by ChatGPT plan; API usage is metered by the selected model. Budget roughly $20–$200+/month for individual-to-heavy use, or usage-based API spend.", source:"https://openai.com/codex/"},
    {id:"claude-code", name:"Claude Code", category:"coding", type:"Terminal coding agent", summary:"A terminal-first agent for exploring a codebase, editing files, running commands, and iterating with developer supervision.", strengths:["Excellent long-context code exploration","Natural terminal workflow","Hooks and tool permissions make the loop composable"], weaknesses:["Can be expensive for long autonomous sessions","Quality varies with repo context and prompt discipline","Terminal permissions require a thoughtful setup"], quality:"High for refactors, debugging, and codebase explanation; verify broad changes with tests.", popularity:"Very high · strong developer adoption and active ecosystem", price:"Typically available through a Claude subscription or usage-based API. Common individual budgets are about $20–$200+/month; API cost scales with input/output tokens.", source:"https://www.anthropic.com/claude-code"},
    {id:"copilot", name:"GitHub Copilot", category:"coding", type:"IDE + GitHub coding agent", summary:"Best when your work already lives in GitHub: issues, pull requests, code review, and CI form the harness.", strengths:["Excellent GitHub workflow integration","Fast inline assistance and familiar UX","Useful review and issue-to-PR paths"], weaknesses:["Less flexible outside GitHub-centric workflows","Autonomy is bounded by product surfaces","Quality depends heavily on repository instructions"], quality:"High for everyday completion and bounded PR work; less consistent for open-ended architecture.", popularity:"Very high · one of the largest developer-assistant user bases", price:"Individual subscriptions are commonly around $10–$40/month depending on tier; enterprise pricing is contract-based. Some agent/API features may carry separate usage limits.", source:"https://github.com/features/copilot"},
    {id:"opencode", name:"OpenCode", category:"coding", type:"Open-source terminal agent", summary:"A configurable open-source coding agent for people who want model choice, a TUI, and control over the runtime.", strengths:["Provider and model flexibility","Transparent local workflow","Good fit for experimentation and self-hosting"], weaknesses:["You own setup, model keys, and reliability","Output quality depends on the chosen model","Smaller ecosystem than major hosted products"], quality:"Variable to high; excellent value when paired with a strong model and disciplined checks.", popularity:"High · visible open-source project with strong developer interest", price:"The harness is free; you pay the model provider directly. Typical personal usage can range from $5–$100+/month depending on model and session length.", source:"https://opencode.ai/"},
    {id:"pi", name:"Pi coding agent", category:"coding", type:"Minimal extensible coding agent", summary:"A deliberately small harness for builders who want to inspect and extend the loop instead of hiding it behind a product.", strengths:["Minimal surface area","Highly hackable extensions","Keeps state and tool calls understandable"], weaknesses:["Less turnkey than hosted agents","You configure the provider and safeguards","Smaller community and fewer polished integrations"], quality:"As good as the model and extensions you wire in; strong for focused, technical workflows.", popularity:"Emerging · strong interest among agent builders, smaller mainstream footprint", price:"Usually free as software; model/API spend is pay-as-you-go. Expect roughly $5–$80+/month for regular personal use.", source:"https://github.com/badlogic/pi-mono"},
    {id:"openhands", name:"OpenHands", category:"coding", type:"Open-source software engineer agent", summary:"A runtime-oriented harness for software tasks that combines a model with a browser, shell, files, and feedback.", strengths:["Broad action space","Useful for issue-driven engineering tasks","Open-source runtime can be self-hosted"], weaknesses:["More moving parts to operate","Autonomous actions can burn tokens quickly","Needs sandboxing and evaluation before production use"], quality:"Medium to high on well-scoped SWE tasks; variance is higher than a supervised IDE assistant.", popularity:"High · recognized open-source coding-agent project", price:"Open-source software is free; infrastructure and model calls are yours. A small deployment may cost $20–$200+/month before heavy usage.", source:"https://github.com/All-Hands-AI/OpenHands"},
    {id:"hermes", name:"Hermes", category:"research", type:"Personal agent harness", summary:"A personal-agent pattern for connecting a model to tools, memory, and everyday tasks over time.", strengths:["Persistent context and personal workflows","Good for tool-rich daily assistance","Can be shaped around your own routines"], weaknesses:["Personal data and permissions need strong boundaries","Quality depends on memory retrieval","Project naming and implementations vary"], quality:"Useful for recurring personal tasks; factual work still needs source checking and human review.", popularity:"Emerging · niche builder and personal-agent interest", price:"Usually self-hosted or open-source; model/API costs are usage-based. Budget $5–$50+/month for light personal use.", source:"https://github.com/NousResearch/hermes-agent"},
    {id:"openclaw", name:"OpenClaw", category:"research", type:"Open personal-agent runtime", summary:"A persistent workspace and tool loop for long-running, multi-step personal or technical tasks.", strengths:["Long-running workspace model","Flexible tool integration","Good playground for agent memory and autonomy"], weaknesses:["Less standardized than mainstream products","Security model varies by deployment","Can be difficult to evaluate objectively"], quality:"Promising for exploratory workflows; output quality depends on configuration and model.", popularity:"Emerging · early-stage open-source visibility", price:"Typically free to run yourself; pay for model API calls and hosting. Light usage may be $5–$50/month; autonomous workloads can be much higher.", source:"https://github.com/openclaw"},
    {id:"deepseek", name:"DeepSeek harness", category:"research", type:"Model + tool-use stack", summary:"A model-focused setup for putting DeepSeek reasoning behind planning, tool calls, and verification.", strengths:["Low-cost model options can be attractive","Strong reasoning value for the price","Useful for custom, API-first harnesses"], weaknesses:["You must build the surrounding runtime","Latency, availability, and model versions change","Quality is sensitive to prompt and tool schemas"], quality:"High value for structured reasoning and coding; production quality depends on your harness and chosen endpoint.", popularity:"Very high · broad developer awareness and API experimentation", price:"API is pay-as-you-go and generally priced below frontier hosted assistants; a practical small-project budget is $5–$100+/month, but token volume dominates.", source:"https://www.deepseek.com/"},
    {id:"browser-use", name:"Browser Use", category:"research", type:"Browser-control runtime", summary:"Turns a browser into an action surface so an agent can navigate, fill forms, search, and report results.", strengths:["Useful for sites without APIs","Natural fit for research and repetitive web work","Can recover from some UI variation"], weaknesses:["Websites change underneath it","Login, CAPTCHA, and sensitive actions are hard","Browser actions are slower and less deterministic than APIs"], quality:"Medium for open-web tasks; high when the workflow is narrow and observable.", popularity:"High · popular open-source browser-agent category", price:"Software is commonly free or open-source; you pay for model tokens plus browser compute. Light use often lands around $10–$100+/month.", source:"https://github.com/browser-use/browser-use"},
    {id:"perplexity", name:"Perplexity Research", category:"research", type:"Hosted search-and-citation agent", summary:"A packaged research loop that searches, follows sources, and synthesizes answers with citations.", strengths:["Fast path to cited research","Good search UX and source visibility","Low setup cost"], weaknesses:["Citation presence is not citation correctness","Less control over retrieval and planning","Subscription limits vary"], quality:"High for first-pass web research; verify important claims against primary sources.", popularity:"Very high · widely used consumer research product", price:"Consumer plans are commonly around $20/month; enterprise plans are higher. API and search usage are separately metered where available.", source:"https://www.perplexity.ai/"},
    {id:"langgraph", name:"LangGraph", category:"research", type:"Stateful agent framework", summary:"A graph runtime for explicit state, branching, checkpoints, tool calls, and human review.", strengths:["Precise control over state and transitions","Strong fit for production workflows","Good observability and checkpoint patterns"], weaknesses:["More engineering effort than a prompt chain","You must design the graph well","Framework complexity can be overkill for simple tasks"], quality:"Potentially very high because the workflow is explicit; quality is determined by your nodes, tools, and evals.", popularity:"High · strong framework adoption and ecosystem", price:"Open-source framework is free; hosted platform and model/API usage are paid. Small prototypes may cost $0–$50/month; production spend varies widely.", source:"https://www.langchain.com/langgraph"},
    {id:"goose", name:"Goose", category:"automation", type:"Open-source developer agent", summary:"Connects a model to local tools, APIs, and repeatable engineering workflows through an extensible harness.", strengths:["MCP and tool integration","Open-source and local-friendly","Good for repeatable developer automation"], weaknesses:["Setup and provider configuration are on you","Tool permissions need care","Output depends on extensions and model choice"], quality:"Medium to high for structured developer automation; strongest with narrow tools.", popularity:"Growing · strong open-source and MCP interest", price:"Free software; model API and infrastructure are usage-based. Typical personal use may be $5–$80+/month.", source:"https://github.com/block/goose"},
    {id:"autogen", name:"AutoGen", category:"automation", type:"Multi-agent framework", summary:"Composes agents that message one another, call tools, and coordinate multi-step work.", strengths:["Flexible multi-agent patterns","Good for experiments and orchestration","Supports human-in-the-loop designs"], weaknesses:["Multi-agent chatter can multiply cost","Harder to debug than one loop","Role-play does not guarantee better results"], quality:"Variable; can be excellent for decomposable workflows but needs strong termination and evaluation.", popularity:"High · established research and developer ecosystem", price:"Open-source framework is free; model/API usage is pay-as-you-go. Budget $10–$150+/month for prototypes depending on conversation volume.", source:"https://github.com/microsoft/autogen"},
    {id:"crewai", name:"CrewAI", category:"automation", type:"Role-based multi-agent framework", summary:"Delegates research, planning, and execution between specialized agents with explicit tasks and roles.", strengths:["Fast to prototype role-based workflows","Readable task and delegation model","Useful for business-process experiments"], weaknesses:["Roles can add theater without better outcomes","Delegation increases latency and tokens","Needs careful shared-state design"], quality:"Medium for business workflows; high only when roles map to real capability boundaries.", popularity:"High · strong community among automation builders", price:"Open-source core is free; hosted features and model/API calls are paid. Typical prototypes cost $5–$100+/month.", source:"https://github.com/crewAIInc/crewAI"},
    {id:"cline", name:"Cline", category:"automation", type:"IDE agent", summary:"An IDE-native agent that inspects a project, edits files, runs commands, and requests approval before risky actions.", strengths:["Visible approval gates","Excellent interactive coding loop","Works with many model providers"], weaknesses:["Token use can spike on large context","IDE state can hide complexity","Requires provider setup and careful permissions"], quality:"High for supervised coding and debugging; less ideal for unattended automation.", popularity:"High · strong VS Code community visibility", price:"Extension is generally free; you pay your provider directly. Typical use ranges from $5–$100+/month depending on model and activity.", source:"https://github.com/cline/cline"},
    {id:"swe-agent", name:"SWE-agent", category:"automation", type:"Research software-engineering harness", summary:"Turns issue context into repository actions with a purpose-built environment and evaluation loop.", strengths:["Designed around measurable SWE tasks","Useful research benchmark lineage","Explicit agent-environment boundary"], weaknesses:["More benchmark-oriented than consumer-polished","Setup can be involved","Performance varies by issue type"], quality:"Strong on benchmark-shaped bug fixes; real-world repos still need tests and review.", popularity:"High · influential in coding-agent research", price:"Open-source software is free; you pay for model calls and compute. Research runs can range from tens to hundreds of dollars depending on scale.", source:"https://github.com/SWE-agent/SWE-agent"},
    {id:"operator", name:"Operator", category:"automation", type:"Computer-use agent", summary:"Uses visual browser or desktop interaction to complete everyday tasks where APIs are unavailable.", strengths:["Can act across ordinary websites","Useful for repetitive personal workflows","Handles tasks humans normally do in a browser"], weaknesses:["Slow and fragile compared with APIs","Sensitive actions need supervision","UI changes and security prompts can break runs"], quality:"Medium for bounded browser tasks; never assume a successful click means a correct outcome.", popularity:"High · highly visible computer-use category", price:"Usually packaged as a subscription or product feature; plan for roughly $20–$200+/month depending on access, limits, and task volume.", source:"https://openai.com/index/introducing-operator/"},
  ];

  function toolLink(tool) {
    return `tool.html?tool=${tool.id}`;
  }

  function renderDirectory() {
    const list = document.querySelector("#directory-list");
    if (!list) return;
    const buttons = document.querySelectorAll("[data-directory-filter]");
    const render = (category) => {
      list.innerHTML = tools.filter((tool) => category === "all" || tool.category === category).map((tool, index) => `
        <a class="directory-row" href="${toolLink(tool)}">
          <span class="directory-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="directory-name"><strong>${tool.name}</strong><small>${tool.type}</small></span>
          <span class="directory-fit">${tool.category}</span>
          <span class="directory-quality">${tool.quality.split(";")[0]}</span>
          <span class="directory-price">${tool.price.split(".")[0]}.</span>
          <span class="directory-arrow">↗</span>
        </a>
      `).join("");
    };
    buttons.forEach((button) => button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      render(button.dataset.directoryFilter);
    }));
    render("all");
  }

  function renderToolProfile() {
    const mount = document.querySelector("#tool-profile");
    if (!mount) return;
    const id = new URLSearchParams(window.location.search).get("tool");
    const tool = tools.find((item) => item.id === id) || tools[0];
    document.title = `${tool.name} — Harness`;
    mount.innerHTML = `
      <section class="tool-hero section-shell">
        <a class="back-link" href="directory.html">← Back to directory</a>
        <div class="section-tag">${tool.category} / profile</div>
        <h1>${tool.name}</h1>
        <p class="tool-summary">${tool.summary}</p>
        <div class="tool-meta"><span>${tool.type}</span><span>${tool.popularity}</span></div>
      </section>
      <section class="tool-body section-shell">
        <div class="tool-main">
          <div class="detail-block"><div class="section-tag">What it does</div><p>${tool.summary} Its harness determines what context enters the loop, which tools are available, and how the result is checked before it is handed back.</p></div>
          <div class="detail-block"><div class="section-tag">Output quality</div><p>${tool.quality}</p><div class="quality-meter"><span class="quality-fill"></span></div><small>Practical profile · not a standardized benchmark</small></div>
          <div class="detail-columns"><div class="detail-block"><div class="section-tag">Benefits</div><ul>${tool.strengths.map((item) => `<li>${item}</li>`).join("")}</ul></div><div class="detail-block"><div class="section-tag">Weaknesses</div><ul>${tool.weaknesses.map((item) => `<li>${item}</li>`).join("")}</ul></div></div>
        </div>
        <aside class="tool-aside"><div class="aside-card price-card"><div class="section-tag">Typical cost</div><h2>${tool.price}</h2><p>Pricing changes frequently. Treat this as a planning range, not a quote.</p></div><div class="aside-card"><div class="section-tag">Popularity signal</div><h3>${tool.popularity}</h3><p>Visibility and ecosystem momentum are useful adoption signals, but popularity is not the same as output quality.</p></div><a class="source-link" href="${tool.source}" target="_blank" rel="noreferrer">Visit official project ↗</a></aside>
      </section>
      <section class="tool-bottom"><div class="section-shell"><div class="section-tag">When to choose it</div><h2>Use it when the loop<br /><em>matches the work.</em></h2><a class="button button-dark" href="directory.html">Compare another tool <span>→</span></a></div></section>
    `;
  }

  renderDirectory();
  renderToolProfile();
