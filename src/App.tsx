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
      A[Start] --> B[User selects source type: Website, Youtube, Pdf, Csv, Txt]
      B --> C[User provides file/URL]
      C --> D[Upload/Read ONE file]
      D --> E[Select provider and online LLM model]
      E --> F[Initialize Oracle]
      F --> G[User sends question]
      G --> H[Online LLM responds based on loaded file]
      H --> I[Display response and update history]
  `;
  const diagram2 = `
    graph TD
      A[Start]
      B[User selects source type: Website, Youtube, PDF, CSV, TXT, CSV with document list]
      C1[User provides file/URL]
      C2[User uploads single file]
      C3[User uploads CSV with document list]
      D1[Upload/Read ONE file]
      D2[Upload and read multiple files via list]
      E[Select provider and online LLM model]
      F[Initialize Oracle]
      G[User sends question]
      H[RAG/LLM online responds based on loaded files]
      I[Display response and update history]
      J[Option to export history as JSON]

      A --> B
      B -->|Website/Youtube/PDF/CSV/TXT| C1 --> C2 --> D1
      B -->|CSV with list| C3 --> D2
      D1 --> E
      D2 --> E
      E --> F
      F --> G --> H --> I --> J
  `;

  const diagram3 = `
    graph TD
      A[Start]
      B[User selects source type: Website, Youtube, PDF, CSV, TXT, Document List]
      C1[User provides file/URL]
      C2[User uploads single file]
      C3[Selects TXT document list]
      E[Select provider and model: OpenAI online OR Ollama local]
      F[Initialize Oracle]
      G[User sends question]

      %% Flow for Document List + Local/RAG
      C3 --> H1[Load multiple documents]
      H1 --> E

      %% Flow for single file
      B -->|Website/Youtube/PDF/CSV/TXT| C1 --> C2
      C2 --> E
      E --> F
      F --> G

      %% Decision for local or online execution (model)
      G --> K{Document list?}
      K -- "Yes" --> M{Local or Online Model?}
      M -- "Local/Ollama" --> N[RAG with Local/Ollama Model embeddings]
      M -- "Online/OpenAI" --> O[RAG with OpenAI Model embeddings]
      K -- "No" --> P[LLM responds based on current document]
      N --> Q[Response + doc sources]
      O --> Q
      P --> Q
      Q --> R[Display response and update history]
      R --> S[Option to export chat as JSON]
  `;

  const diagram4 = `
    graph TD
      A[Start]
      B[User selects source type: Website, Youtube, PDF, CSV, TXT, Document List]
      C1[User provides file/URL]
      C2[User uploads single file]
      C3[Selects TXT document list]
      E[Select provider and model: OpenAI online or Ollama local]
      F[Initialize Oracle]
      G[User sends question]

      %% Flow for Document List + Local/RAG optimized
      C3 --> E

      %% Flow for single file
      B -->|Website/Youtube/PDF/CSV/TXT| C1 --> C2 --> E

      E --> F --> G

      %% Decision: Document list?
      G --> K{Document list?}
      K -- "Yes" --> L{Embeddings index exists?}
      L -- "Yes" --> M[Load index from disk without embeddings cost]
      L -- "No" --> N[Create embeddings and save index]
      M --> P{Local or Online Model?}
      N --> P

      P -- "Local/Ollama" --> Q[RAG with Local Ollama Model embeddings]
      P -- "Online/OpenAI" --> R[RAG with OpenAI Model embeddings]
      Q --> S[Response and doc sources]
      R --> S
      K -- "No" --> T[LLM responds based on current file]
      T --> S
      S --> U[Display response and update history]
      U --> V[Option to export chat as JSON]
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
      title: "The Future of Human Communication",
      subtitle: "When Thought Becomes Text",
      icon: Brain,
      content: (
        <div className="space-y-8 sm:space-y-16 animate-fade-in">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Brain GIF - Positioned after the title */}
            <div className="mb-12 sm:mb-12">
              <img
                src="/brain-2.gif"
                alt="Animation of the brain showing neural activity and brain-computer interfaces"
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
                <span className="text-lg sm:text-2xl font-medium text-gray-800">Hello world!</span>
              </div>
            </div>

            <div className="card p-6 sm:p-10 border-0 glass-effect">
              <h3 className="text-heading-2 sm:text-heading-1 text-gray-900 mb-4 sm:mb-6">What if you could write just by thinking?</h3>
              <p className="text-body sm:text-body-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto">
                With the advent of artificial intelligence, we need to rethink the human-machine interface.
                Imagine that simply thinking becomes a prompt for you to interact with your favorite AI.
              </p>
              <div className="card p-6 sm:p-8 shadow-lg border-0 glass-effect">
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center">
                    <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-success-600" />
                  </div>
                  <span className="text-heading-3 text-gray-900 text-center sm:text-left">More Than Inclusive Technology</span>
                </div>
                <p className="text-body-sm sm:text-body text-gray-700 leading-relaxed">
                  What if you could simply <strong className="text-secondary-600">think</strong> and, based on your neural wave data,
                  we could translate your thoughts directly into text? This is not science fiction —
                  it is the future of communication through human-machine interfaces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">

              <div className="card p-6 sm:p-8 border-l-4 border-secondary-500 hover:shadow-xl transition-all duration-300 glass-effect">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Thought</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Capture of neural signals through non-invasive EEG</p>
              </div>

              <div className="card p-6 sm:p-8 border-l-4 border-warning-500 hover:shadow-xl transition-all duration-300 glass-effect">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Signals & AI</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Advanced algorithms decode neural patterns</p>
              </div>

              <div className="card p-6 sm:p-8 border-l-4 border-success-500 hover:shadow-xl transition-all duration-300 glass-effect sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Neural Prompt</h4>
                </div>
                <p className="text-body-sm text-gray-600 leading-relaxed">Text generated automatically, revolutionizing digital access</p>
              </div>
            </div>
          </div>

          {/* Consolidated Research Section */}
          <div className="card p-6 sm:p-12 border-0 glass-effect mt-12 sm:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-heading-2 sm:text-heading-1 text-gray-900 mb-4 sm:mb-6">Research Contextualization</h3>
              <p className="text-body sm:text-body-lg text-gray-700 max-w-4xl mx-auto">
                Decoding sentences through Brain Waves using EEG and Machine Learning
              </p>
            </div>

            {/* Objectives and Methodology - Horizontal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
              <div className="card p-6 sm:p-8 border-0 shadow-lg glass-effect">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Objectives</h4>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    <strong>Main:</strong> Investigate whether it is possible to identify specific sentences
                    through the analysis of EEG signals during listening and mental recall.
                  </p>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    <strong>Focus:</strong> Map neural patterns to semantic structures,
                    establishing a foundation for brain-computer interfaces and knowledge management systems.
                  </p>
                </div>
              </div>

              <div className="card p-6 sm:p-8 border-0 shadow-lg glass-effect">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 sm:text-heading-2 text-gray-900 text-center sm:text-left">Methodology</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Headphones className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">8-channel OpenBCI headset</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">2 instructions every 8 seconds</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-accent-600 mr-3" />
                    <span className="text-body-sm text-gray-700">~6 min of training</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data, Processing and Target Audience - Compact Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Data Collection</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">60 EEG segments</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">2 distinct sentences</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">250 Hz, ~4s/segment</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-success-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Processing</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Filtering</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Neural features</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Audio-EEG synchronization</span>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Target Audience</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">Prompt engineers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">Assistive Technology</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-warning mr-3"></div>
                    <span className="text-body-sm text-gray-700">BCI Researchers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools - Compact Horizontal Layout */}
            <div className="card p-4 sm:p-6 border-0 shadow-lg mb-6 sm:mb-8 glass-effect">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-0 sm:mr-3 mb-3 sm:mb-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 text-center sm:text-left">Tools and Resources</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-secondary-800">OpenBCI</span>
                  <p className="text-caption text-secondary-600 mt-1">EEG Hardware</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-accent-800">Python</span>
                  <p className="text-caption text-accent-600 mt-1">Data analysis</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-primary-800">Scikit-learn</span>
                  <p className="text-caption text-primary-600 mt-1">Machine Learning</p>
                </div>
                <div className="glass-effect rounded-lg p-3 sm:p-4 text-center">
                  <span className="text-body-sm font-medium text-success-800">MNE</span>
                  <p className="text-caption text-success-600 mt-1">Processing</p>
                </div>
              </div>
            </div>

            {/* Relevance - Final Compact Section */}
            <div className="card p-4 sm:p-6 border-0 shadow-lg glass-effect">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-0 sm:mr-3 mb-3 sm:mb-0">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 text-center sm:text-left">Relevance and Impact</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-2">Scientific Impact</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    Pioneered contribution to brain-computer interfaces, establishing methodologies
                    for semantic neural decoding and knowledge management systems.
                  </p>
                </div>
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-2">Social Impact</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    Potential to revolutionize digital accessibility, offering new forms
                    of communication and expanding technological inclusion through human-machine interfaces.
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
      title: "Digital Oracle",
      subtitle: "Innovative Automated Literature Review Tool",
      icon: Search,
      content: (
        <div className="space-y-12 animate-fade-in">
            {/* Main Description */}
            <div className="card p-8 border-0 shadow-lg glass-effect mb-10">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Cpu className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h4 className="text-heading-2 text-gray-900 mb-4">Advanced Research Assistant</h4>
                  <p className="text-body text-gray-700 leading-relaxed mb-6">
                    We developed a revolutionary tool that uses artificial intelligence to process
                    and synthesize information from scientific articles. This digital oracle enables systematic analysis
                    of EEG publications through PDFs, significantly optimizing the literature review process.
                  </p>
                  <p className="text-body text-gray-700 leading-relaxed">
                    The oracle works as an advanced research assistant, automatically extracting relevant data,
                    methodologies, and conclusions from analyzed articles, ensuring a robust theoretical/technical foundation for our research.
                  </p>
                </div>
              </div>
            </div>

            {/* GIF Demonstration */}
            <div className="card p-8 border-0 shadow-lg glass-effect mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <Play className="w-6 h-6 text-secondary-600" />
                </div>
                <h4 className="text-heading-2 text-gray-900">Practical Demonstration</h4>
              </div>
              <p className="text-body text-gray-700 leading-relaxed mb-6">
                See how the Digital Oracle works in practice, processing scientific articles and extracting valuable insights
                for our research on brain-computer interfaces. Access{' '}
                <a href="https://oraculocreative.streamlit.app/" target="_blank" className="underline underline-offset-2 hover:text-accent-700">here</a>.
              </p>

              {/* GIF Demonstration */}
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <img
                  src="/oraculo.gif"
                  alt="Demonstration of the Digital Oracle processing scientific articles and extracting insights for EEG and brain-computer interface research"
                  className="w-full h-auto"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Demonstration of the Digital Oracle analyzing scientific articles on EEG and automatically extracting relevant information
              </p>
            </div>

            {/* Features and Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="card p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Features</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Automatic analysis of article PDFs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Extraction of methodologies and conclusions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Intelligent information synthesis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-info mr-3"></div>
                    <span className="text-body-sm text-gray-700">Processing of EEG literature</span>
                  </div>
                </div>
              </div>

              <div className="card p-6 border-0 shadow-lg glass-effect">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900">Benefits</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Broader literature coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Optimized review process</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Robust theoretical foundation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot status-success mr-3"></div>
                    <span className="text-body-sm text-gray-700">Updated and comprehensive analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodological Impact */}
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-warning-600" />
                </div>
                <h4 className="text-heading-2 text-gray-900">Methodological Advancement</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-3">Research Innovation</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    The implementation of this tool represents a significant advancement in research methodology,
                    enabling specialized and updated analysis of EEG literature.
                  </p>
                </div>
                <div>
                  <h5 className="text-body font-medium text-gray-900 mb-3">Complement to Traditional Methods</h5>
                  <p className="text-body-sm text-gray-700 leading-relaxed">
                    This modern approach to traditional methods
                    offers a more complete and efficient perspective for reviewing existing scientific literature.
                  </p>
                </div>
              </div>
            </div>

            {/* Unified Development Stages */}
            <div className="card p-8 border-0 shadow-lg glass-effect mt-8">
              <h4 className="text-heading-2 text-gray-900 mb-2">Development Stages</h4>
              <div className="space-y-10 mt-6">
                {/* Diagrams 1 and 2 */}
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">1</div>
                      <p className="text-body-sm text-gray-700">Version 1.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram1 }} />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">2</div>
                      <p className="text-body-sm text-gray-700">Version 2.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram2 }} />
                  </div>
                </div>
                {/* Diagrams 3 and 4 */}
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">3</div>
                      <p className="text-body-sm text-gray-700">Version 3.0</p>
                    </div>
                    <div className="mermaid mx-auto" dangerouslySetInnerHTML={{ __html: diagram3 }} />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-1/2">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold mr-2">4</div>
                      <p className="text-body-sm text-gray-700">Version 4.0</p>
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
      title: "Raw Data",
      subtitle: "Electroencephalogram (EEG)",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Raw Data</h2>
                <p className="text-body-lg text-gray-800 mb-2">EEG Data Acquisition / Neural Headset</p>
                <p className="text-body text-gray-700">EEG signals from 8 electrodes/channels during listening to "Sun on the Face" and "Relax" instructions</p>
              </div>
            </div>

            {/* Main Activities Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Activities:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">60</h4>
                  <p className="text-body-sm text-gray-700">samples</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">2</h4>
                  <p className="text-body-sm text-gray-700">different classes</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">250 Hz</h4>
                  <p className="text-body-sm text-gray-700">Sampling frequency</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">~4s</h4>
                  <p className="text-body-sm text-gray-700">Duration per sample</p>
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
                alt="EEG signals captured during music playback"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                EEG signals captured during music playback.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Topo Channels Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/topo_channels.png"
                alt="Position of EEG channels on the top of the skull"
                className="w-half h-auto rounded-lg shadow-lg mx-auto"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
               Position of EEG channels on the top of the skull.
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
               Audio with instructions for the Sun Imagery task.
              </p>
            </div>
          </div>

        </div>
      )
    },
    {
      id: 4,
      title: "Preprocessing",
      subtitle: "Signal Filtering",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Filtering</h2>
                <p className="text-body-lg text-gray-800 mb-2">Signal Normalization</p>
                <p className="text-body text-gray-700">Filtering of 8 EEG channels for noise removal <br />and isolation of frequency bands relevant to neural activity</p>
              </div>
            </div>

            {/* Main Activities Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Activities:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">High-Pass Filter</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Removal of low-frequency components such as slow drifts and movement artifacts, allowing focus on fast and cognitively relevant neural activities.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Low-Pass Filter</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Attenuation of high frequencies to preserve slower neural oscillations, such as delta and theta waves, associated with relaxation states and diffuse attention.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Notch Filter</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Selective elimination of electrical grid noise (50/60 Hz) to ensure spectral purity of brain signals during analysis.</p>
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
                alt="Impact of blinks on wave capture of FP1 Channel"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Example of channel with raw data before filtering.
              </p>
            </div>

            {/* FP1 Filtrado Image */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/FP1 Filtrado.png"
                alt="FP1 signal after filtering and normalization"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Signal after filtering and normalization. Processing applied for noise and "drift" removal.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Artifact Removal",
      subtitle: "Elimination of physiological noise, such as eye movements (blinks) and conductivity variations due to sweat, preserving clean neural activity for analysis.",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Raw Database Cleaning</h2>
                <p className="text-body-lg text-gray-800 mb-2">Artifact removal and signal preparation for analysis</p>
                <p className="text-body text-gray-700">When working with raw EEG signals, it is essential to remove physiological artifacts <br /> such as blinks, muscle movements, or noise caused by sweat. </p>
              </div>
            </div>

            {/* Main Activities Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Activities:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">ICA Decomposition</h4>
                  <p className="text-body-sm text-gray-700">Separation of independent components</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">ICA Label</h4>
                  <p className="text-body-sm text-gray-700">Automatic identification and removal of ocular and muscular artifacts</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Final Cleaning</h4>
                  <p className="text-body-sm text-gray-700">Results in a clean signal ready for feature extraction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="space-y-8">
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/ICA.png"
                alt="Independent Component Analysis (ICA) of EEG signals"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Independent Component Analysis (ICA) for separation and identification of distinct neural sources in EEG signals.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Feature Extraction",
      subtitle: "Multiscale Feature Engineering",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Feature Analysis</h2>
                <p className="text-body-lg text-gray-800 mb-2">Multiscale Feature Engineering</p>
                <p className="text-body text-gray-700">After cleaning the EEG signal, we extract relevant characteristics <br /> so that models can learn patterns of brain activity.</p>
              </div>
            </div>

            {/* Main Activities Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Activities:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Band Power</h4>
                  <p className="text-body-sm text-gray-700">Calculation of energy in delta, theta, alpha, beta and gamma bands</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Hjorth</h4>
                  <p className="text-body-sm text-gray-700">Measures of variation and complexity in the time domain</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Wavelet Features</h4>
                  <p className="text-body-sm text-gray-700">Extraction of multiscale patterns with wavelet transform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="space-y-8">
            {/* Brain Waves */}
            <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/Bandas Cerebrais.png"
                alt="Clustering of brain waves by frequency"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Frequency spectrum by electrode, clustered by brain bands.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Learning Model",
      subtitle: "Neural Architecture",
      icon: Brain,
      content: (
        <div className="space-y-12 animate-fade-in">
          {/* First Model */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-bold mr-6 shadow-lg neon-glow">
                5
              </div>
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Deep Learning</h2>
                <p className="text-body-lg text-gray-800 mb-2">EEG NetCustom</p>
                <p className="text-body text-gray-700">Specialized convolutional neural network for EEG signal processing</p>
              </div>
            </div>
            {/* Main Activities */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Activities:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">No parameters</h4>
                  <p className="text-body-sm text-gray-700">"Dirty" model without specialized parameter selection for classification task</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Data Division</h4>
                  <p className="text-body-sm text-gray-700">Sliding windows of 2s with 0.5s overlap</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Validation</h4>
                  <p className="text-body-sm text-gray-700">Validation with separated data, monitoring performance at each epoch to avoid overfitting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mermaid First Model */}
          <div className="space-y-8">
            <div className="card p-12 border-0 shadow-xl glass-effect text-center">
              <div className="w-20 h-20 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-accent-500" />
              </div>
              <h4 className="text-heading-2 text-gray-900 mb-4">EEGNet CNN Architecture</h4>
              <p className="text-body text-gray-600 mb-8">Visualization of the convolutional neural network architecture specialized for EEG signal processing</p>
              <div className="bg-gray-100 rounded-lg p-16 border-2 border-dashed border-gray-300">
              <div className="mermaid flex justify-center" dangerouslySetInnerHTML={{ __html: diagramEEGNet }} />
              </div>
            </div>
          </div>

          {/* Second Model (Results) */}
          <div className="card p-12 border-0 shadow-xl glass-effect">
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-heading-1 text-gray-900 mb-2">Results</h2>
                <p className="text-body-lg text-gray-800 mb-2">Model Performance</p>
                <p className="text-body text-gray-700">Description of results obtained with the EEGNet CNN model</p>
              </div>
            </div>
            {/* Main Metrics Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Metrics:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">80.9%</h4>
                  <p className="text-body-sm text-gray-700">Val balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">64.6%</h4>
                  <p className="text-body-sm text-gray-700">Test balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">65.0%</h4>
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

          {/* Confusion Matrix Image */}
          <div className="card p-8 border-0 shadow-xl glass-effect">
              <img
                src="/EEGNetCustom.png"
                alt="Confusion matrix of prediction of two mental states: Sun on face and relaxation"
                className="w-half h-auto rounded-lg shadow-lg mx-auto"
              />
              <p className="text-body-sm text-gray-600 mt-4 text-center italic">
                Confusion matrix of prediction of two mental states: Sun on face and relaxation.
              </p>
            </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Learning Model",
      subtitle: "Application of Classical Architectures",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Classical Machine Learning Models</h2>
                <p className="text-body-lg text-gray-800 mb-2">Performance</p>
                <p className="text-body text-gray-700">Detailed analysis of results obtained with the EEGNet CNN model</p>
              </div>
            </div>
            {/* Main Models */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Models:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Logistic Regression</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.900 ± 0.062</p>
                  <p className="text-body-sm text-gray-700">Performed well, small error in `rest` class</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">Random Forest</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.967 ± 0.041</p>
                  <p className="text-body-sm text-gray-700">Excellent, AUC 1.0 in hold-out</p>
                </div>
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">LightGBM</h4>
                  <p className="text-body-sm text-gray-700">Accuracy: 0.983 ± 0.033</p>
                  <p className="text-body-sm text-gray-700">Best model so far, no overfitting</p>
                </div>
              </div>
            </div>

            {/* Main Metrics Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main LightGBM Metrics:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">98.3%</h4>
                  <p className="text-body-sm text-gray-700">Val balanced acc</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-2">99.9%</h4>
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

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-gray-900 mb-6">Training and Testing</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">Training was done with temporal average per channel in each instruction.</span>
                </div>
                <div className="flex items-start">
                <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">The model used the best parameters extracted by Hjorth + Wavelet.</span>
                </div>
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">Main evaluation was done by 5-fold cross-validation, with extra verification via hold-out to avoid overfitting.</span>
                </div>
              </div>
            </div>

            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-gray-900 mb-6">Interpretation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">The model accurately identifies when the brain is in active imagination and is more confident when there is intention.</span>
                </div>
                <div className="flex items-start">
                  <div className="status-dot status-warning mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">Relaxation states still show overlap with light focus, but separation is clear in most cases.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Practical Application",
      subtitle: "Brain-Computer Interface (BCI)",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Practical Application</h2>
                <p className="text-body-lg text-gray-800 mb-2">Brain-Computer Interface (BCI)</p>
                <p className="text-body text-gray-700">Real implementation of the system for direct neural communication</p>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Use Cases:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Accessibility className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Digital Accessibility</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Communication for people with motor limitations through direct thought.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Neural Control</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Control of devices and interfaces through brain signals.</p>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-heading-3 text-gray-900 mb-3">Augmented Communication</h4>
                  <p className="text-body-sm text-gray-700 leading-relaxed">Expansion of human communication capabilities through AI.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Brain Demonstration */}
          <div className="card p-8 border-0 shadow-xl glass-effect">
            <div className="text-center mb-6">
              <h3 className="text-heading-2 text-gray-900 mb-4">Real-Time BCI System</h3>
              <p className="text-body text-gray-700">Visualization of brain activity during neural processing</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
              <img
                src="/brain-2.gif"
                alt="3D visualization of real-time brain activity during EEG signal processing for brain-computer interface"
                className="w-full h-auto"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            <p className="text-body-sm text-gray-600 mt-4 text-center italic">
              3D visualization of real-time brain activity during EEG signal processing
            </p>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Limitations and Challenges of a BCI",
      subtitle: "Reflections on the technical, practical, and ethical obstacles of a tailored system",
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
                <h2 className="text-heading-1 text-gray-900 mb-2">Brain-Computer Interface (BCI)</h2>
                <p className="text-body-lg text-gray-800 mb-2">Critical analysis of current limitations and challenges to be overcome</p>
                <p className="text-body text-gray-700"></p>
              </div>
            </div>

            {/* Technical Challenges */}
            <div className="mb-8">
              <h3 className="text-heading-2 text-gray-900 mb-8">Main Challenges:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-secondary-600" />
                    </div>
                    <h4 className="text-heading-3 text-gray-900">Technical Challenges</h4>
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
                      <span className="text-body-sm text-gray-700">User variability: EEG signals vary greatly from person to person, requiring individual training.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Noise sensitivity: fragile signals, easily impacted by blinks, muscles, and environment.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Constant calibration: different sessions may require readjustments and new learning cycles.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Limited resolution: surface EEG has lower precision compared to invasive methods.</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6 border-0 shadow-lg glass-effect">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-secondary-600" />
                    </div>
                    <h4 className="text-heading-3 text-gray-900">Practical Challenges</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">User training: the system needs to learn from the user, and the user from the system.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Usability: even with comfort advances, daily use still requires discipline.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Cost and maintenance: access to equipment and technical support are still barriers.</span>
                    </div>
                    <div className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body-sm text-gray-700">Difficulty adapting BCI to real contexts of prolonged use, outside controlled environments.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Possible Paths */}
          <div className="card p-8 border-0 shadow-lg glass-effect">
            <h3 className="text-heading-2 text-gray-900 mb-6">Possible Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-heading-3 text-gray-900 mb-4">Technical:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Adaptive and personalized models</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Real-time noise filtering</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-success mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Integration with other signal sources (e.g., EMG, eye tracking)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-heading-3 text-gray-900 mb-4">Practical:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Automated remote support (via AI)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">Onboarding and self-help protocols</span>
                  </div>
                  <div className="flex items-start">
                    <div className="status-dot status-info mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-body-sm text-gray-700">User community + open source</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ethical and Regulatory Aspects */}
          <div className="card p-8 border-0 shadow-lg glass-effect">
            <h3 className="text-heading-2 text-gray-900 mb-6">Ethical and Regulatory Aspects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Neural data privacy</h4>
                <p className="text-body-sm text-gray-700">Protection of sensitive neural data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Transparency in interpretative AI use</h4>
                <p className="text-body-sm text-gray-700">Transparency in interpretative AI use</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-2">Equitable access to assistive technology</h4>
                <p className="text-body-sm text-gray-700">Equitable access to assistive technology</p>
              </div>
            </div>
          </div>
        </div>
      )

    },
    {
      id: 11,
      title: "Conclusion and Paths for Future Personal Neural Communication",
      subtitle: "From a functional prototype to a real autonomy tool",
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
                What we've done so far
              </h3>
              <ul className="space-y-4 text-secondary-800">
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">A customized BCI, non-invasive, and trainable at home.</span>
                </li>
                <li className="flex flex-col items-start">
                  <div className="flex items-start">
                  <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                    <span className="text-body">Robust classification of two mental states (imagination vs. relaxation), with:</span>
                  </div>
                  <ul className="ml-14 space-y-2">
                    <li className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body">Balanced Accuracy: up to 98%</span>
                    </li>
                    <li className="flex items-start">
                    <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                      <span className="text-body">Response time: ~100ms</span>
                    </li>
                  </ul>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Complete EEG processing and classification pipeline with ML/DL.</span>
                </li>
              </ul>
            </div>

            <div className="card p-8 border-0 shadow-lg glass-effect">
              <h3 className="text-heading-2 text-success-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-accent-500 rounded-xl flex	items-center justify-center mr-4">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                Next Steps
              </h3>
              <ul className="space-y-4 text-success-800">
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Expand binary commands to a broader vocabulary.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Explore symbolic or emotional communication paradigms.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Creating adaptive feedback interfaces.</span>
                </li>
                <li className="flex items-start">
                <div className="status-dot status-neutral mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#6B7280'}}></div>
                  <span className="text-body">Building an open-hardware product with community support.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card p-12 border-0 shadow-xl text-center glass-effect neon-glow">
            <h3 className="text-heading-1 text-gray-900 mb-6">"A world where thinking is enough to communicate and express."</h3>
            <p className="text-body-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
              This project represents a step towards truly personal, non-invasive, and scalable machine-brain interfaces, with the potential to transform lives and imaginations without compromising autonomy and privacy.
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
                <span className="text-heading-3 text-gray-900">Expanded Imagination</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Time of Dreams",
      subtitle: "An idea and many minds involved",
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
                  <span className="text-heading-3 text-gray-900 text-center sm:text-left">Repository</span>
                </div>
                <p className="text-body-sm sm:text-body text-gray-700 leading-relaxed">
                  Learn more about our project on <a href="https://github.com/linalopes/creativity-in-vitro-eeg" target="_blank" className="text-accent-600 underline underline-offset-2 hover:text-secondary-700">GitHub repository</a>. There you'll find all the source code, documentation, and technical details of our implementation of brain-computer interface.
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
              <h2 className="text-heading-3 text-gray-900">Navigation</h2>
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
              <span>Progress</span>
              <span>{currentSlide + 1} of {slides.length}</span>
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
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-caption text-gray-500">
              {currentSlide + 1} of {slides.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`btn ${currentSlide === slides.length - 1 ? 'btn-ghost opacity-50 cursor-not-allowed' : 'btn-primary'} focus-ring`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
