import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Database, Brain, Zap, Activity, Users, Lightbulb, ArrowRight, Play, Pause, BarChart3, TrendingUp, Eye, Accessibility, Target, Settings, FileText, Music, Headphones, Clock, Search, BookOpen, Cpu, Menu, X, Computer } from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs').then((mermaid) => {
      mermaid.default.run();
    });
  }, [currentSlide]); // <– importante!


  const diagram1 = `
    graph TD
      A[Início] --> B[Usuário escolhe tipo de fonte: Site, Youtube, Pdf, Csv, Txt]
      B --> C[Usuário informa arquivo/URL]
      C --> D[Upload/Leitura de UM arquivo]
      D --> E[Seleção de provedor e modelo LLM online]
      E --> F[Inicializa Oráculo]
      F --> G[Usuário envia pergunta]
      G --> H[LLM online responde baseado no arquivo carregado]
      H --> I[Exibe resposta e atualiza histórico]
  `;
  const diagram2 = `
    graph TD
      A[Início]
      B[Usuário escolhe tipo de fonte: Site, Youtube, PDF, CSV, TXT, CSV com lista de documentos]
      C1[Usuário informa arquivo/URL]
      C2[Usuário faz upload de arquivo único]
      C3[Usuário faz upload de CSV com lista de documentos]
      D1[Upload/Leitura de UM arquivo]
      D2[Upload e leitura de vários arquivos via lista]
      E[Seleção de provedor e modelo LLM online]
      F[Inicializa Oráculo]
      G[Usuário envia pergunta]
      H[RAG/LLM online responde com base nos arquivos lidos]
      I[Exibe resposta e atualiza histórico]
      J[Opção de exportar histórico em JSON]

      A --> B
      B -->|Site/Youtube/PDF/CSV/TXT| C1 --> C2 --> D1
      B -->|CSV com lista| C3 --> D2
      D1 --> E
      D2 --> E
      E --> F
      F --> G --> H --> I --> J
  `;

  const diagram3 = `
    graph TD
      A[Início]
      B[Usuário escolhe tipo de fonte: Site, Youtube, PDF, CSV, TXT, Lista de documentos]
      C1[Usuário informa arquivo/URL]
      C2[Usuário faz upload de arquivo único]
      C3[Seleciona lista de documentos TXT]
      E[Seleciona provedor e modelo: OpenAI online OU Ollama local]
      F[Inicializa Oráculo]
      G[Usuário envia pergunta]

      %% Fluxo para Lista de Documentos + Local/RAG
      C3 --> H1[Carrega múltiplos documentos]
      H1 --> E

      %% Fluxo para único arquivo
      B -->|Site/Youtube/PDF/CSV/TXT| C1 --> C2
      C2 --> E

      E --> F
      F --> G

      %% Decisão de execução local ou online (modelo)
      G --> K{Lista de documentos?}
      K -- "Sim" --> M{Modelo Local ou Online?}
      M -- "Local/Ollama" --> N[RAG com embeddings Modelo local/Ollama]
      M -- "Online/OpenAI" --> O[RAG com embeddings Modelo OpenAI]
      K -- "Não" --> P[LLM responde com base no documento atual]
      N --> Q[Resposta + fontes dos docs]
      O --> Q
      P --> Q
      Q --> R[Exibe resposta e atualiza histórico]
      R --> S[Opção de exportar chat em JSON]
  `;

  const diagram4 = `
    graph TD
      A[Início]
      B[Usuário escolhe tipo de fonte: Site, Youtube, PDF, CSV, TXT, Lista de documentos]
      C1[Usuário informa arquivo ou URL]
      C2[Usuário faz upload de único arquivo]
      C3[Seleciona lista de documentos TXT]
      E[Seleciona provedor ou modelo: OpenAI online ou Ollama local]
      F[Inicializa Oráculo]
      G[Usuário envia pergunta]

      %% Fluxo para Lista de Documentos + Local/RAG otimizado
      C3 --> E

      %% Fluxo para único arquivo
      B -->|Site/Youtube/PDF/CSV/TXT| C1 --> C2 --> E

      E --> F --> G

      %% Decisão: Lista de documentos?
      G --> K{Lista de documentos?}
      K -- "Sim" --> L{Índice de embeddings já existe?}
      L -- "Sim" --> M[Carrega índice do disco sem custo de embeddings]
      L -- "Não" --> N[Cria embeddings e salva índice]
      M --> P{Modelo Local ou Online?}
      N --> P

      P -- "Local/Ollama" --> Q[RAG com embeddings Modelo local Ollama]
      P -- "Online/OpenAI" --> R[RAG com embeddings Modelo OpenAI]
      Q --> S[Resposta e fontes dos docs]
      R --> S
      K -- "Não" --> T[LLM responde baseado no arquivo atual]
      T --> S
      S --> U[Exibe resposta e atualiza histórico]
      U --> V[Opção de exportar chat em JSON]
  `;

  const diagramEEGNet = `
    graph TD
      Input["Input EEG<br/>(batch, channels, samples)"]
      Expand["Unsqueeze → (batch, 1, channels, samples)"]

      Conv1["Conv2D (1→4), kernel=(1×64), padding=(0,32)"]
      BN1["BatchNorm2D (4)"]
      ELU1["ELU activation"]

      Depthwise["Depthwise Conv2D (4→8), kernel=(channels×1), groups=4"]
      BN2["BatchNorm2D (8)"]
      ELU2["ELU"]
      Pool1["AvgPool2D (1×4)"]
      Drop1["Dropout 0.5"]

      Sep["Separable Conv2D (1×16), padding=(0,8)"]
      BN3["BatchNorm2D (8)"]
      ELU3["ELU"]
      Pool2["AvgPool2D (1×4)"]
      Drop2["Dropout 0.5"]

      Flatten["Flatten"]
      FC["Linear → n_classes"]
      Output["Output logits"]

      Input --> Expand --> Conv1 --> BN1 --> ELU1
      ELU1 --> Depthwise --> BN2 --> ELU2 --> Pool1 --> Drop1
      Drop1 --> Sep --> BN3 --> ELU3 --> Pool2 --> Drop2
      Drop2 --> Flatten --> FC --> Output
  `;


  const slides = [
    {
      id: 1,
      title: "O Futuro da Comunicação Humana",
      subtitle: "Quando o Pensamento se Torna Texto",
      icon: Brain,
      content: (
        <div className="space-y-8 sm:space-y-16 animate-fade-in">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Brain GIF - Positioned after the title */}
            <div className="mb-12 sm:mb-12">
              <img
                src="/brain-2.gif"
                alt="Animação do cérebro mostrando atividade neural e interfaces cérebro-computador"
                className="w-full mx-auto rounded-xl shadow-lg"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12">
              <div className="relative">
                <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-secondary-500" />
                <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-accent-500 rounded-full animate-pulse"></div>
              </div>
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 rotate-90 sm:rotate-0" />
              <div className="relative">
                <Zap className="w-16 h-16 sm:w-20 sm:h-20 text-warning-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-warning-300 rounded-full animate-pulse"></div>
              </div>
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 rotate-90 sm:rotate-0" />
              <div className="card p-4 sm:p-6 shadow-xl border-0 glass-effect neon-glow">
                <span className="text-lg sm:text-2xl font-medium text-gray-800">Olá mundo!</span>
              </div>
            </div>

            <div className="card p-6 sm:p-10 border-0 glass-effect">
              <h3 className="text-heading-2 sm:text-heading-1 text-gray-900 mb-4 sm:mb-6">E se você pudesse escrever apenas pensando?</h3>
              <p className="text-body sm:text-body-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto">
                Com o advento da inteligência artificial, precisamos repensar a interface humano-máquina.
                Imagine que o simples pensar se torna um prompt para você interagir com seu IA favorito.
              </p>
              <div className="card p-6 sm:p-8 shadow-lg border-0 glass-effect">
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center">
                    <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-success-600" />
                  </div>
                  <span className="text-heading-3 text-gray-900 text-center sm:text-left">Tecnologia Mais Que Inclusiva</span>
                </div>
                <p className="text-body-sm sm:text-body text-gray-700 leading-relaxed">
                  E se ela pudesse simplesmente <strong className="text-secondary-600">pensar</strong> e, baseado nos dados das suas ondas neurais,
                  conseguíssemos traduzir seus pensamentos diretamente em texto? Isso não é ficção científica —
                  é o futuro da comunicação através de interfaces humano-máquina.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">

              <div className="card p-6 sm:p-8 border-l-4 border-secondary-500 hover:shadow-xl transition-all duration-300 glass-effect">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Pensamento</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Captura de sinais neurais através de EEG não-invasivo</p>
              </div>

              <div className="card p-6 sm:p-8 border-l-4 border-warning-500 hover:shadow-xl transition-all duration-300 glass-effect">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Sinais & IA</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Algoritmos avançados decodificam padrões neurais</p>
              </div>

              <div className="card p-6 sm:p-8 border-l-4 border-success-500 hover:shadow-xl transition-all duration-300 glass-effect sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Prompt Neural</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Texto gerado automaticamente, revolucionando o acesso digital</p>
              </div>
            </div>
          </div>

          {/* Seção Consolidada da Pesquisa */}
          <div className="card p-6 sm:p-12 border-0 glass-effect mt-12 sm:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-heading-2 sm:text-heading-1 text-gray-900 mb-4 sm:mb-6">Contextualização da Pesquisa</h3>
              <p className="text-body sm:text-body-lg text-gray-700 max-w-4xl mx-auto">
                Decodificando frases através de Ondas Cerebrais usando EEG e Machine Learning
              </p>
            </div>

            {/* Objetivos e Metodologia - Layout Horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
              <div className="card p-6 sm:p-8 border-0 shadow-lg glass-effect">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Objetivos</h4>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    <strong>Principal:</strong> Investigar se é possível identificar frases específicas
                    através da análise de sinais EEG durante audição e recordação mental.
                  </p>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    <strong>Foco:</strong> Mapear padrões neurais para estruturas semânticas,
                    estabelecendo base para interfaces cérebro-computador e sistemas de knowledge management.
                  </p>
                </div>
              </div>

              <div className="card p-6 sm:p-8 border-0 shadow-lg glass-effect">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Metodologia</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Headphones className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">OpenBCI headset de 8 canais</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">2 instruções a cada 8 segundos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">~6 min de treino</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dados, Processamento e Público-Alvo - Layout Compacto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Coleta de Dados</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">60 segmentos EEG</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">2 frases distintas</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">250 Hz, ~4s/segmento</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-success-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Processamento</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Filtragem</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Features neurais</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Sincronização áudio-EEG</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Público-Alvo</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">Prompteiros</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">Tecnologia Assistiva</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">Pesquisadores BCI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ferramentas - Layout Horizontal Compacto */}
            <div className="card p-4 sm:p-6 border-0 shadow-lg mb-6 sm:mb-8 glass-effect">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-0 sm:mr-3 mb-3 sm:mb-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 text-center sm:text-left">Ferramentas e Recursos</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-secondary-800">OpenBCI</span>
                  <p className="text-caption text-secondary-600 mt-1">Hardware EEG</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-accent-800">Python</span>
                  <p className="text-caption text-accent-600 mt-1">Análise de dados</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-primary-800">Scikit-learn</span>
                  <p className="text-caption text-primary-600 mt-1">Machine Learning</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-success-800">MNE</span>
                  <p className="text-caption text-success-600 mt-1">Processamento</p>
                </div>
              </div>
            </div>

            {/* Relevância - Seção Final Compacta */}
            <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-0 sm:mr-3 mb-3 sm:mb-0">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 text-center sm:text-left">Relevância e Impacto</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-2">Impacto Científico</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    Contribuição pioneira para interfaces cérebro-computador, estabelecendo metodologias
                    para decodificação semântica neural e sistemas de knowledge management.
                  </p>
                </div>
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-2">Impacto Social</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    Potencial para revolucionar acessibilidade digital, oferecendo novas formas
                    de comunicação e expandindo inclusão tecnológica através de interfaces humano-máquina.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Oráculo Digital",
      subtitle: "Ferramenta Inovadora de Revisão Bibliográfica Automatizada",
      icon: Search,
      content: (
        <div className="space-y-12 animate-fade-in">
            {/* Descrição Principal */}
            <div className="card p-8 border-0 shadow-lg glass-effect mb-10">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Cpu className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h4 className="text-heading-2 text-gray-900 mb-4">Assistente de Pesquisa Avançado</h4>
                  <p className="text-body text-gray-700 leading-relaxed mb-6">
                    Desenvolvemos uma ferramenta revolucionária que utiliza inteligência artificial para processar
                    e sintetizar informações de artigos científicos. Este oráculo digital permite a análise sistemática
                    de publicações sobre EEG através de PDFs, otimizando significativamente o processo de revisão bibliográfica.
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    O oráculo funciona como um assistente de pesquisa avançado, extraindo automaticamente dados relevantes,
                    metodologias e conclusões dos artigos analisados, garantindo uma fundamentação teórica/técnica robusta para nossa pesquisa.
                  </p>
                </div>
              </div>
            </div>

            {/* Demonstração em GIF */}
            <div className="card p-8 border-0 shadow-lg glass-effect mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <Play className="w-6 h-6 text-secondary-600" />
                </div>
                <h4 className="text-heading-2 text-gray-900">Demonstração Prática</h4>
              </div>
              <p className="text-body text-gray-700 leading-relaxed mb-6">
                Veja como o Oráculo Digital funciona na prática, processando artigo científicos e extraindo insights valiosos
                para nossa pesquisa sobre interfaces cérebro-computador. Acesse{' '}
                <a href="https://oraculocreative.streamlit.app/" target="_blank" className="underline underline-offset-2 hover:text-accent-700">aqui</a>.
              </p>

              {/* GIF Demonstration */}
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <img
                  src="/oraculo.gif"
                  alt="Demonstração do Oráculo Digital processando artigos científicos e extraindo insights para pesquisa sobre EEG e interfaces cérebro-computador"
                  className="w-full h-auto"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Demonstração do Oráculo Digital analisando artigos científicos sobre EEG e extraindo informações relevantes automaticamente
              </p>
            </div>

            {/* Funcionalidades e Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="card p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Funcionalidades</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Análise automática de PDFs de artigos</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Extração de metodologias e conclusões</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Síntese inteligente de informações</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Processamento de literatura sobre EEG</span>
                  </div>
                </div>
              </div>

              <div className="card p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Benefícios</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Cobertura mais ampla da literatura</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Processo de revisão otimizado</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Fundamentação teórica robusta</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Análise atualizada e abrangente</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impacto na Metodologia */}
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-warning-600" />
                </div>
                <h4 className="text-heading-2 text-gray-900">Avanço Metodológico</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-3">Inovação em Pesquisa</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    A implementação desta ferramenta representa um avanço significativo na metodologia de pesquisa,
                    permitindo uma análise especializada e atualizada da literatura sobre EEG.
                  </p>
                </div>
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-3">Complemento aos Métodos Tradicionais</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    Esta abordagem moderna aos metódos tradicionais
                    oferece uma perspectiva mais completa e eficiente de revisão da literatura científica existente.
                  </p>
                </div>
              </div>
            </div>

            {/* Etapas de Desenvolvimento Unificadas */}
            <div className="card p-8 border-0 shadow-lg glass-effect mt-8">
              <h4 className="text-heading-2 text-gray-900 mb-2">Etapas de Desenvolvimento</h4>
              <div className="space-y-10 mt-6">
                {/* Diagramas 1 e 2 */}
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">1</div>
                      <p className="text-body-sm text-gray-700">Versão 1.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram1 }} />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">2</div>
                      <p className="text-body-sm text-gray-700">Versão 2.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram2 }} />
                  </div>
                </div>
                {/* Diagramas 3 e 4 */}
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">3</div>
                      <p className="text-body-sm text-gray-700">Versão 3.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram3 }} />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">4</div>
                      <p className="text-body-sm text-gray-700">Versão 4.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram4 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

      )
    },
    {
      id: 3,
      title: "Dados Brutos",
      subtitle: "Eletroencefalograma (EEG)",
      icon: Database,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                1
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Dados Brutos</h2>
                <p className="text-body-lg text-gray-800 mb-2">Aquisição de dados de EEG / Capacete Neural</p>
                <p className="text-body text-gray-700">Sinais EEG de 8 eletrodos/canais durante audição das instruções "Sun on the Face" and "Relax"</p>
              </div>
            </div>

            {/* Principais Atividades Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Atividades:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">60</h4>
                  <p className="text-body-sm text-gray-700">amostras</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">2</h4>
                  <p className="text-body-sm text-gray-700">classes diferentes</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">250 Hz</h4>
                  <p className="text-body-sm text-gray-700">Frequência de amostragem</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">~4s</h4>
                  <p className="text-body-sm text-gray-700">Duração por amostra</p>
                </div>
              </div>
            </div>
          </div>


          {/* Images Section - Full Width */}
          <div className="space-y-8">
            {/* EEG Raw Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/EEG Novo.png"
                alt="Sinais EEG capturados durante a reprodução da música"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Sinais EEG capturados durante a reprodução da música.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Topo Channels Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/topo_channels.png"
                alt="Posição dos canais EEG no topo do crânio"
                className="w-half h-auto rounded-lg shadow-lg mx-auto"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
               Posição dos canais EEG no topo do crânio.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Audio Instructions */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <audio
                src="/audio_instructions_ses-03.wav"
                controls
                className="w-half mx-auto"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
               Audio com as instruções para a tarefa de Sun Imagery.
              </p>
            </div>
          </div>

        </div>
      )
    },
    {
      id: 4,
      title: "Pré-Processamento",
      subtitle: "Filtragem de Sinais",
      icon: BarChart3,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                2
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Filtragem</h2>
                <p className="text-body-lg text-gray-800 mb-2">Normalização de Sinais</p>
                <p className="text-body text-gray-700">Filtragem dos 8 canais EEG para remoção de ruído <br />e isolamento das bandas de frequência relevantes à atividade neural</p>
              </div>
            </div>

            {/* Principais Atividades Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Atividades:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Filtro Passa-Alta</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Remoção de componentes de baixa frequência como derivações lentas e artefatos de movimento, permitindo o foco em atividades neurais rápidas e cognitivamente relevantes.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Filtro Passa-Baixa</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Atenuação das frequências altas para preservar oscilações neurais mais lentas, como ondas delta e theta, associadas a estados de relaxamento e atenção difusa.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Filtro Notch</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Eliminação seletiva do ruído de rede elétrica (50/60 Hz) para garantir a pureza espectral dos sinais cerebrais durante a análise.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="space-y-8">
            {/* Raw Pisc Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/Raw Pisc.png"
                alt="Impacto de piscadas na captação ondulatória do Canal FP1"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Exemplo de canal com os dados brutos antes da filtragem.
              </p>
            </div>

            {/* FP1 Filtrado Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/FP1 Filtrado.png"
                alt="Sinal FP1 após filtração e normalização"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Sinal após filtração e normalização. Processamento aplicado para remoção de ruído e "drift".
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Remoção de Artefatos",
      subtitle: "Eliminação de ruídos fisiológicos, como movimentos oculares (piscadas) e variações de condutividade devido ao suor, preservando a atividade neural limpa para análise.",
      icon: Eye,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                3
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Limpeza da Base de Dados Bruta</h2>
                <p className="text-body-lg text-gray-800 mb-2">Remoção de artefatos e preparação do sinal para análise</p>
                <p className="text-body text-gray-700">Quando trabalhamos com sinais brutos de EEG, é essencial remover artefatos fisiológicos <br /> como piscadas, movimentos musculares ou ruídos causados por suor. </p>
              </div>
            </div>

            {/* Principais Atividades Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Atividades:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Decomposição ICA</h4>
                  <p className="text-body-sm text-gray-700">Separação de componentes independentes</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">ICA Label</h4>
                  <p className="text-body-sm text-gray-700">Identificação e remoção automática de artefatos oculares e musculares</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Limpeza Final</h4>
                  <p className="text-body-sm text-gray-700">Resulta em um sinal limpo e pronto para extração de features</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="space-y-8">
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/ICA.png"
                alt="Análise de Componentes Independentes (ICA) dos sinais EEG"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Análise de Componentes Independentes (ICA) para separação e identificação de fontes neurais distintas nos sinais EEG.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Análise de Features",
      subtitle: "Extração de Características",
      icon: Eye,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                4
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Análise de Features</h2>
                <p className="text-body-lg text-gray-800 mb-2">Engenharia de características multiescalares</p>
                <p className="text-body text-gray-700">Após a limpeza do sinal EEG, extraímos características relevantes <br /> para que os modelos consigam aprender padrões de atividade cerebral.</p>
              </div>
            </div>

            {/* Principais Atividades Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Atividades:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Band Power</h4>
                  <p className="text-body-sm text-gray-700">Cálculo da energia em bandas delta, teta, alfa, beta e gama</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Hjorth</h4>
                  <p className="text-body-sm text-gray-700">Medidas de variação e complexidade no domínio do tempo</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Wavelet Features</h4>
                  <p className="text-body-sm text-gray-700">Extração de padrões multiescalares com transformada wavelet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="space-y-8">
            {/* Ondas Cerebrais */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/Bandas Cerebrais.png"
                alt="Clusterização das ondas cerebrais por frequência"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Espectro de frequência por eletrodo, clusterizado por bandas cerebrais.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Modelo de Aprendizado",
      subtitle: "Arquitetura Neural",
      icon: Brain,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Primeiro Modelo */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                5
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Deep Learning</h2>
                <p className="text-body-lg text-gray-800 mb-2">EEG NetCustom</p>
                <p className="text-body text-gray-700">Rede neural convolucional especializada para processamento de sinais EEG</p>
              </div>
            </div>
            {/* Principais Atividades */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Atividades:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Sem parâmetros</h4>
                  <p className="text-body-sm text-gray-700">Modelo "sujo" sem seleção de parâmetros especializados para a tarefa de classificação</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Divisão dos Dados</h4>
                  <p className="text-body-sm text-gray-700">Janelas deslizantes de 2s com sopreposição de 0,5s</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Validação</h4>
                  <p className="text-body-sm text-gray-700">Validação com dados separados, monitorando desempenho a cada epoch para evitar overfitting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mermaid Primeiro Modelo */}
          <div className="space-y-8">
            <div className="card p-12 border-0 shadow-xl glass-effect text-center">
              <div className="w-20 h-20 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-accent-500" />
              </div>
              <h4 className="text-heading-2 text-gray-900 mb-4">Arquitetura EEGNet CNN</h4>
              <p className="text-body text-gray-600 mb-8">Visualização da arquitetura da rede neural convolucional especializada para processamento de sinais EEG</p>
              <div className="bg-gray-100 rounded-lg p-16 border-2 border-dashed border-gray-300">
              <div className="mermaid flex justify-center" dangerouslySetInnerHTML={{ __html: diagramEEGNet }} />
              </div>
            </div>
          </div>

          {/* Segundo Modelo (igual ao primeiro, pronto para editar) */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Resultados</h2>
                <p className="text-body-lg text-gray-800 mb-2">Perfomance do Modelo</p>
                <p className="text-body text-gray-700">Descrição dos resultados obtidos com o modelo EEGNet CNN</p>
              </div>
            </div>
            {/* Principais Métricas Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Métricas:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">80,9%</h4>
                  <p className="text-body-sm text-gray-700">Val balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">64,6%</h4>
                  <p className="text-body-sm text-gray-700">Test balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">65,0%</h4>
                  <p className="text-body-sm text-gray-700">Accuracy</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">68%</h4>
                  <p className="text-body-sm text-gray-700">F1 sun_block</p>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder Segundo Modelo */}
          <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/EEGNetCustom.png"
                alt="Análise de Componentes Independentes (ICA) dos sinais EEG"
                className="w-half h-auto rounded-lg shadow-lg mx-auto"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Matriz de Confusão da predição dos dois estados mentais: Sol no rosto e relaxamento.
              </p>
            </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Modelo de Aprendizado",
      subtitle: "Aplicação de Arquiteturas Clássicas",
      icon: TrendingUp,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                7
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Modelos Clássicos de Machine Learning</h2>
                <p className="text-body-lg text-gray-800 mb-2">Performance </p>
                <p className="text-body text-gray-700">Análise detalhada dos resultados obtidos com o modelo EEGNet CNN</p>
              </div>
            </div>
            {/* Principais Atividades */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Modelos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Logistic Regression</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.900 ± 0.062</p>
                  <p className="text-body-sm text-gray-700">Acertou bem, pequeno erro no `rest` class</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Random Forest</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.967 ± 0.041</p>
                  <p className="text-body-sm text-gray-700">Excelente, AUC 1.0 no hold-out</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">LightGBM</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.983 ± 0.033</p>
                  <p className="text-body-sm text-gray-700">Melhor modelo até agora, sem overfitting</p>
                </div>
              </div>
            </div>

            {/* Principais Métricas Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Métricas do LightGBM:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">98,3%</h4>
                  <p className="text-body-sm text-gray-700">Val balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">99,9%</h4>
                  <p className="text-body-sm text-gray-700">Test balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">98%</h4>
                  <p className="text-body-sm text-gray-700">Accuracy</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">100%</h4>
                  <p className="text-body-sm text-gray-700">F1 sun_block</p>
                </div>
              </div>
            </div>
          </div>

          {/* Análise Detalhada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-gray-900 mb-6">Treino e Teste</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">O treinamento foi feito com média temporal por canal em cada instrução.</span>
                </div>
                <div className="flex items-start">
                <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">O modelo usou os melhores parâmetros extraídos por Hjorth + Wavelet.</span>
                </div>
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">A avaliação principal foi feita por 5-fold cross-validation, com verificação extra via hold-out para evitar overfitting.</span>
                </div>
              </div>
            </div>

            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-gray-900 mb-6">Interpretação</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">O modelo identifica com precisão quando o cérebro está em imaginação ativa e acerta com mais confiança quando há intenção.</span>
                </div>
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">Estados de relaxamento ainda apresentam sobreposição com foco leve, mas a separação é clara na maioria dos casos.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Aplicação Prática",
      subtitle: "Interface Cérebro-Computador (BCI)",
      icon: Users,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                8
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Aplicação Prática</h2>
                <p className="text-body-lg text-gray-800 mb-2">Interface Cérebro-Computador (BCI)</p>
                <p className="text-body text-gray-700">Implementação real do sistema para comunicação neural direta</p>
              </div>
            </div>

            {/* Casos de Uso Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Casos de Uso:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Accessibility className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Acessibilidade Digital</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Comunicação para pessoas com limitações motoras através de pensamento direto.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Controle Neural</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Controle de dispositivos e interfaces através de sinais cerebrais.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Comunicação Aumentada</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Expansão das capacidades de comunicação humana através de IA.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demonstração 3D Brain */}
          <div className="card p-8 border-0 shadow-xl glass-effect">
            <div className="text-center mb-6">
              <h3 className="text-heading-2 text-gray-900 mb-4">Sistema BCI em Tempo Real</h3>
              <p className="text-body text-gray-700">Visualização da atividade cerebral durante o processamento neural</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
              <img
                src="/brain-2.gif"
                alt="Visualização 3D da atividade cerebral em tempo real durante o processamento de sinais EEG para interface cérebro-computador"
                className="w-full h-auto"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            <p className="text-body-sm text-gray-600 mt-4 text-center italic">
              visualização 3D da atividade cerebral em tempo real durante o processamento de sinais EEG
            </p>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Limitações e Desafios de uma BCI",
      subtitle: "Reflexões sobre os obstáculos técnicos, práticos e éticos de um sistema sob medida",
      icon: Settings,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Header Section - Full Width */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-secondary-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                9
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Interface Cérebro-Computador (BCI)</h2>
                <p className="text-body-lg text-gray-800 mb-2">Análise crítica das limitações atuais e desafios a serem superados</p>
                <p className="text-body text-gray-700"></p>
              </div>
            </div>

            {/* Desafios Técnicos */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Principais Desafios:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-secondary-600" />
                    </div>
                    <h4 className="text-heading-3 text-gray-900">Desafios Técnicos</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      {/* Available status color classes:
                        status-error (red)
                        status-success (green)
                        status-warning (yellow/orange)
                        status-info (blue)
                        status-neutral (gray)
                      */}
                      <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Variabilidade entre usuários: os sinais EEG variam muito de pessoa para pessoa, exigindo treino individual.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Sensibilidade a ruído: sinais frágeis, facilmente impactados por piscadas, músculos e ambiente.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Calibração constante: sessões diferentes podem exigir reajustes e novos ciclos de aprendizado.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Resolução limitada: EEG de superfície tem precisão menor comparado a métodos invasivos.</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-secondary-600" />
                    </div>
                    <h4 className="text-heading-3 text-gray-900">Desafios Práticos</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Treinamento do usuário: o sistema precisa aprender com o usuário, e o usuário com o sistema.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Usabilidade: mesmo com avanço em conforto, o uso cotidiano ainda exige disciplina.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Custo e manutenção: acesso a equipamentos e suporte técnico ainda são barreiras.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Dificuldade em adaptar a BCI a contextos reais de uso prolongado, fora de ambientes controlados.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Possíveis Caminhos */}
          <div className="card p-8 border-0 shadow-lg glass-effect">
            <h3 className="text-heading-2 text-gray-900 mb-6">Possíveis Caminhos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-heading-3 text-gray-900 mb-4">Técnicos:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Modelos adaptativos e personalizados</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Filtragem de ruído em tempo real</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Integração com outras fontes de sinal (ex: EMG, rastreamento ocular)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-heading-3 text-gray-900 mb-4">Práticos:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Suporte remoto automatizado (via IA)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Protocolos de onboarding e autoajuda</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Comunidade de usuários + open source</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aspectos Éticos e Regulatórios */}
          <div className="card p-8 border-0 shadow-lg glass-effect">
            <h3 className="text-heading-2 text-gray-900 mb-6">Aspectos Éticos e Regulatórios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Privacidade de dados neurais</h4>
                <p className="text-body-sm text-gray-700">Proteção de dados neurais sensíveis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Transparência no uso de IA interpretativa</h4>
                <p className="text-body-sm text-gray-700">Transparência no uso de IA interpretativa</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Acesso equitativo à tecnologia assistiva</h4>
                <p className="text-body-sm text-gray-700">Acesso equitativo à tecnologia assistiva</p>
              </div>
            </div>
          </div>
        </div>
      )

    },
    {
      id: 11,
      title: "Conclusão e Caminhos para o Futuro da Comunicação Neuronal Pessoal",
      subtitle: "De um protótipo funcional para uma ferramenta de autonomia real",
      icon: Lightbulb,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Conteúdo principal sem repetir título e subtítulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-accent-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                O que fizemos até aqui
              </h3>
              <ul className="space-y-4 text-secondary-800">
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Uma interface BCI customizada, não-invasiva e treinável em casa.</span>
                </li>
                <li className="flex flex-col items-start">
                  <div className="flex items-start">
                  <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                    <span className="text-body">Classificação robusta de dois estados mentais (imaginação vs. relaxamento), com:</span>
                  </div>
                  <ul className="ml-14 space-y-2">
                    <li className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body">Balanced Accuracy: até 98%</span>
                    </li>
                    <li className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body">Tempo de resposta: ~100ms</span>
                    </li>
                  </ul>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Pipeline completo de processamento EEG e classificação com ML/DL.</span>
                </li>
              </ul>
            </div>

            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-success-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-accent-500 rounded-xl flex	items-center justify-center mr-4">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                Próximos Passos
              </h3>
              <ul className="space-y-4 text-success-800">
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Expandir comandos binários para um vocabulário expandido.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Explorar paradigmas de comunicação simbólica ou emocional.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Criação de interfaces de feedback adaptativo.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Construção de um produto open-hardware com apoio da comunidade.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card p-12 border-0 shadow-xl text-center glass-effect neon-glow">
            <h3 className="text-heading-1 text-gray-900 mb-6">"Um mundo onde pensar é suficiente para se comunicar e se expressar."</h3>
            <p className="text-body-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
              Este projeto representa um passo em direção a tecnologias de interface cérebro-máquina realmente pessoais, não invasivas e escaláveis, com potencial de transformar a vida e a imaginação das pessoas sem abrir mão da autonomia e da privacidade.
            </p>
            <div className="flex justify-center items-center space-x-6">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-accent-600" />
              </div>
              <span className="text-3xl font-light text-gray-400">+</span>
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center">
                <Computer className="w-8 h-8 text-accent-600" />
              </div>
              <span className="text-3xl font-light text-gray-400">=</span>
              <div className="card px-8 py-4 border-0 shadow-lg glass-effect">
                <span className="text-heading-3 text-gray-900">Imaginação Expandida</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Time dos Sonhos",
      subtitle: "Uma ideia e muitas mentes envolvidas",
      icon: Users,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* Conteúdo principal sem repetir título e subtítulo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-accent-900 mb-6 flex items-center">
                <img src="https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNlhNQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--332b291acfc270c8912380ab97695fdf374c5666/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2hwQWNocEFjaDdCam9KWTNKdmNEb09ZWFIwWlc1MGFXOXUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--b67d9ded4d28d0969fbb98b4c21b79257705a99a/sanja.jpg" alt="Foto de Cristiane" className="w-10 h-10 justify-center mr-4 rounded-full object-cover" />
                Cristiane Jorge
              </h3>
              <div className="space-y-4 text-success-800">
                <p className="text-body">I was a project manager for 25 years at Naturgy, a gas company in Rio de Janeiro. Currently, I'm transitioning careers and studying data science.</p>
              </div>
            </div>
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-success-900 mb-6 flex items-center">
              <img src="https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNXZIQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--3bb3177df582153c39539680991aa84bf31349b9/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNJYVFISWFRSElld1k2Q1dOeWIzQTZEbUYwZEdWdWRHbHZiZz09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--23cdbdf9871e44adeb4d843a03b0793a5f08394b/linkedin_filtro.jpeg" alt="Foto de Cristiane" className="w-10 h-10 justify-center mr-4 rounded-full object-cover" />
                Tito Vieira
              </h3>
              <div className="space-y-4 text-success-800">
                <p className="text-body">I have experience in data analysis, currently working in moises.ai/music.ai helping with growth and product analytics. With Le Wagon, I want to deepen my skills in data science and learn to build prediction models to enhance my work.</p>
              </div>
            </div>

            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-accent-900 mb-6 flex items-center">
              <img src="https://avatars.githubusercontent.com/u/195757681?v=4" alt="Foto de Cristiane" className="w-10 h-10 justify-center mr-4 rounded-full object-cover" />
                Mario Tavares
              </h3>
              <div className="space-y-4 text-success-800">
                <p className="text-body">I'm a product manager with a background in finance and tech, having led product initiatives at TRX, Trix Investimentos, and Alice Saúde. Through these roles, I've seen how data-driven decisions dramatically improve user engagement and business outcomes. Now, I'm eager to deepen my technical skills by joining a data science and AI bootcamp. My goal is to apply machine learning and advanced analytics to build intelligent products that truly serve users' needs.</p>
              </div>
            </div>
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-success-900 mb-6 flex items-center">
              <img src="https://avatars.githubusercontent.com/u/10832911?v=4" alt="Foto de Cristiane" className="w-10 h-10 justify-center mr-4 rounded-full object-cover" />
                Lina Lopes
              </h3>
              <div className="space-y-4 text-success-800">
                <p className="text-body">With a background in Creative Technology, I specialized in guiding clients through ideation processes and developing physical prototypes using Arduino, electronics, hardware, and graphical interfaces. Over time, my focus has shifted towards Machine Learning. I am currently completing a specialization in Machine Learning for Creative Practices at the University of Bern, Switzerland, and aim to deepen my work in data visualization and Machine Learning.</p>
              </div>
            </div>
          </div>
          <div className="card p-6 sm:p-8 shadow-lg border-0 glass-effect">
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600" />
                  </div>
                  <span className="text-heading-3 text-gray-900 text-center sm:text-left">Repositório</span>
                </div>
                <p className="text-body-sm sm:text-body text-gray-700 leading-relaxed">
                  Conheça mais sobre nosso projeto no <a href="https://github.com/linalopes/creativity-in-vitro-eeg" target="_blank" className="text-accent-600 underline underline-offset-2 hover:text-secondary-700">repositório no GitHub</a>. Lá você encontrará todo o código fonte, documentação e detalhes técnicos da nossa implementação de interface cérebro-computador.
                </p>
              </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  return (
    <div className="min-h-screen dark-gradient-bg">
      {/* Sidebar - Responsive */}
      <div className={`fixed inset-y-0 left-0 z-50 w-full sm:w-80 glass-effect border-r border-gray-300 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg neon-glow">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-heading-3 text-gray-900">Navegação</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors focus-ring"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-2">
              {slides.map((slide, index) => {
                const Icon = slide.icon;
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg transition-all duration-200 text-left focus-ring ${isActive
                        ? 'bg-gradient-to-r from-secondary-100 to-accent-100 border-l-4 border-secondary-500 shadow-md'
                        : 'hover:bg-gray-100'
                      }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive
                        ? 'bg-secondary-500 text-white shadow-lg neon-glow'
                        : 'bg-gray-200 text-gray-600'
                      }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-body font-medium truncate ${isActive ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                        {slide.title}
                      </h3>
                      <p className={`text-body-sm truncate ${isActive ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                        {slide.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <div className={`self-center w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary-500 animate-pulse`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-300">
            <div className="flex items-center justify-between text-body-sm text-gray-600">
              <span>Progresso</span>
              <span>{currentSlide + 1} de {slides.length}</span>
            </div>
            <div className="progress-bar mt-3">
              <div
                className="progress-fill"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Header - Responsive */}
      <header className="glass-effect sticky top-0 z-30 border-b border-gray-300">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors focus-ring"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg neon-glow">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-heading-2 text-gray-900 font-semibold">Creativity In Vitro</h1>
                <p className="text-body-sm text-gray-600">Le Wagon Demo Day</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-heading-3 text-gray-900 font-semibold">CinV</h1>
                <p className="text-caption text-gray-600">Demo Day</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive */}
      <main className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 transition-all duration-300 ${sidebarOpen ? 'sm:ml-80' : ''
        }`}>
        <div className="card border-0 shadow-2xl overflow-hidden min-h-[500px] sm:min-h-[700px] glass-effect">
          {/* Progress Indicators */}
          <div className="glass-effect px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-300">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus-ring ${index === currentSlide
                      ? 'bg-secondary-500 scale-125 shadow-lg neon-glow'
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                ><span className="sr-only">{index + 1}</span></button>
              ))}
            </div>
            <div className="progress-bar mt-3 sm:mt-4 max-w-md mx-auto">
              <div
                className="progress-fill"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Slide Content - Responsive */}
          <div className="p-4 sm:p-8 lg:p-16">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-heading-1 sm:text-display text-gray-900 mb-3 sm:mb-4 animate-slide-in">
                {slides[currentSlide].title}
              </h2>
              <p className="text-body sm:text-body-lg text-gray-600 animate-slide-in">{slides[currentSlide].subtitle}</p>
            </div>

            <div className="min-h-[400px] sm:min-h-[500px]">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation - Responsive */}
          <div className="glass-effect px-4 sm:px-8 py-6 sm:py-8 flex items-center justify-between border-t border-gray-300">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`btn ${currentSlide === 0 ? 'btn-ghost opacity-50 cursor-not-allowed' : 'btn-ghost hover:bg-gray-200'} focus-ring`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="text-caption text-gray-500">
              {currentSlide + 1} de {slides.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`btn ${currentSlide === slides.length - 1 ? 'btn-ghost opacity-50 cursor-not-allowed' : 'btn-primary'} focus-ring`}
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
