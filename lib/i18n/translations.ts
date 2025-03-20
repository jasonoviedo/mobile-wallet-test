export type Language = "en" | "es" | "pt"

export const translations = {
  en: {
    // Common
    back: "Back",
    next: "Next",
    cancel: "Cancel",
    save: "Save",
    confirm: "Confirm",
    help: "Help",

    // Authentication
    signIn: "Sign In",
    secureAccess: "Access your wallet securely with a one-time password",
    phoneNumber: "Phone Number",
    requestOTP: "Request OTP",
    sendingOTP: "Sending OTP",
    oneTimePassword: "One-Time Password",
    enterCode: "Enter 6-digit code",
    weSentCode: "We sent a code to",
    verifyOTP: "Verify OTP",
    verifying: "Verifying",
    changePhone: "Change phone number",
    invalidOTP: "Invalid OTP. Please try again.",
    enterPhoneNumber: "Enter your phone number without the country code",

    // Dashboard
    balance: "USDC Balance",
    send: "Send",
    receive: "Receive",
    refresh: "Refresh",
    transactions: "Transactions",
    all: "All",
    sent: "Sent",
    received: "Received",
    noTransactions: "No transactions found",

    // Send Money
    sendMoney: "Send money",
    makeTransfer: "Make a bank transfer",
    scheduledPayments: "Also set up scheduled payments",
    recent: "RECENT",
    destinationCountry: "Destination Country",
    recipientReceives: "Recipient receives",
    localCurrency: "Local currency",
    amount: "Amount",
    processingFee: "Processing fee",
    total: "Total",
    exchangeRate: "Exchange Rate",
    amountToBeExchanged: "Amount to be exchanged",

    // Bank Details
    addBankDetails: "Add bank details",
    person: "Person",
    business: "Business",
    checkDetails: "Check details",
    addAmountDetails: "Add amount details",

    // Contact Information
    contactInformation: "Contact Information",
    firstName: "First name",
    lastName: "Last name",
    documentType: "Document type",
    nationalID: "National ID",
    passport: "Passport",
    documentNumber: "Document number",
    emailAddress: "Email address",

    // Business Information
    businessInformation: "Business Information",
    companyName: "Company name",
    nationalIdentificationNumber: "National Identification Number",
    address: "Address",
    phone: "Phone",
    email: "Email",

    // Bank Details
    bankDetails: "Bank details",
    selectBank: "Select bank",
    accountType: "Account type",
    individual: "Individual",
    company: "Company",
    accountNumber: "Account number",

    // Payment Review
    reviewPayment: "Review payment",
    schedule: "Schedule",
    reference: "Reference",
    personalAccount: "Personal Account",
    allDetailsMatch: "All details match",
    processing: "Processing...",
    insufficientBalance: "Insufficient balance",
    enterValidAmount: "Please enter a valid amount",
    showSummary: "Show summary",
    hideSummary: "Hide summary",

    // Receive
    receiveUSDC: "Receive USDC",
    shareAddress: "Share your Solana address to receive USDC",
    scanToReceive: "Scan to receive USDC",
    copy: "Copy",
    copied: "Copied",
    share: "Share",
    backToDashboard: "Back to Dashboard",

    // Profile
    profile: "Profile",
    logout: "Logout",
    loggingOut: "Logging out...",

    // Add new translation keys for transaction details
    recipient: "Recipient",
    transactionDetails: "Transaction Details",
    status: "Status",
    date: "Date",

    // Help Section
    helpAndSupport: "Help & Support",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    howToSendMoney: "How do I send money?",
    howToSendMoneyAnswer:
      "Tap the Send icon in the bottom navigation, select a recipient or enter bank details, enter the amount, and confirm your transaction.",
    howToReceiveMoney: "How do I receive money?",
    howToReceiveMoneyAnswer:
      "Tap the Receive icon in the bottom navigation, then share your wallet address or QR code with the sender.",
    whatAreFees: "What are the fees?",
    whatAreFeesAnswer: "We charge a flat fee of $0.50 per transaction. Exchange rates are updated in real-time.",
    isMoneySafe: "Is my money safe?",
    isMoneySafeAnswer: "Yes, we use industry-standard security protocols and your funds are held in secure wallets.",
    contactSupport: "Contact Support",
    supportTeamAvailable: "Our support team is available 24/7 to assist you with any questions or issues.",
    emailLabel: "Email:",
    phoneLabel: "Phone:",
    whatsappLabel: "WhatsApp:",
    transactionSuccessful: "Transaction Successful",
    moneyOnTheWay: "Your money is on the way",
    transactionId: "Transaction ID",
    completed: "Completed",
    bank: "Bank",

    // Exchange rate update notifications
    increased: "increased",
    decreased: "decreased",
    checkNewAmount: "Please check the new amount the recipient will receive.",
  },

  es: {
    // Common
    back: "Atrás",
    next: "Siguiente",
    cancel: "Cancelar",
    save: "Guardar",
    confirm: "Confirmar",
    help: "Ayuda",

    // Authentication
    signIn: "Iniciar Sesión",
    secureAccess: "Accede a tu billetera de forma segura con una contraseña de un solo uso",
    phoneNumber: "Número de Teléfono",
    requestOTP: "Solicitar OTP",
    sendingOTP: "Enviando OTP",
    oneTimePassword: "Contraseña de un solo uso",
    enterCode: "Ingresa el código de 6 dígitos",
    weSentCode: "Enviamos un código a",
    verifyOTP: "Verificar OTP",
    verifying: "Verificando",
    changePhone: "Cambiar número de teléfono",
    invalidOTP: "OTP inválido. Por favor intenta de nuevo.",
    enterPhoneNumber: "Ingresa tu número de teléfono sin el código de país",

    // Dashboard
    balance: "Saldo USDC",
    send: "Enviar",
    receive: "Recibir",
    refresh: "Actualizar",
    transactions: "Transacciones",
    all: "Todas",
    sent: "Enviadas",
    received: "Recibidas",
    noTransactions: "No se encontraron transacciones",

    // Send Money
    sendMoney: "Enviar dinero",
    makeTransfer: "Hacer una transferencia bancaria",
    scheduledPayments: "También configura pagos programados",
    recent: "RECIENTES",
    destinationCountry: "País de Destino",
    recipientReceives: "El destinatario recibe",
    localCurrency: "Moneda local",
    amount: "Monto",
    processingFee: "Tarifa de procesamiento",
    total: "Total",
    exchangeRate: "Tipo de Cambio",
    amountToBeExchanged: "Monto a ser cambiado",

    // Bank Details
    addBankDetails: "Agregar datos bancarios",
    person: "Persona",
    business: "Empresa",
    checkDetails: "Verificar datos",
    addAmountDetails: "Agregar detalles de monto",

    // Contact Information
    contactInformation: "Información de Contacto",
    firstName: "Nombre",
    lastName: "Apellido",
    documentType: "Tipo de documento",
    nationalID: "Identificación nacional",
    passport: "Pasaporte",
    documentNumber: "Número de documento",
    emailAddress: "Correo electrónico",

    // Business Information
    businessInformation: "Información de la Empresa",
    companyName: "Nombre de la empresa",
    nationalIdentificationNumber: "Número de Identificación Nacional",
    address: "Dirección",
    phone: "Teléfono",
    email: "Correo electrónico",

    // Bank Details
    bankDetails: "Datos bancarios",
    selectBank: "Seleccionar banco",
    accountType: "Tipo de cuenta",
    individual: "Individual",
    company: "Empresa",
    accountNumber: "Número de cuenta",

    // Payment Review
    reviewPayment: "Revisar pago",
    schedule: "Programar",
    reference: "Referencia",
    personalAccount: "Cuenta Personal",
    allDetailsMatch: "Todos los datos coinciden",
    processing: "Procesando...",
    insufficientBalance: "Saldo insuficiente",
    enterValidAmount: "Por favor ingresa un monto válido",
    showSummary: "Mostrar resumen",
    hideSummary: "Ocultar resumen",

    // Receive
    receiveUSDC: "Recibir USDC",
    shareAddress: "Comparte tu dirección de Solana para recibir USDC",
    scanToReceive: "Escanea para recibir USDC",
    copy: "Copiar",
    copied: "Copiado",
    share: "Compartir",
    backToDashboard: "Volver al Panel",

    // Profile
    profile: "Perfil",
    logout: "Cerrar sesión",
    loggingOut: "Cerrando sesión...",

    // Add new translation keys for transaction details
    recipient: "Destinatario",
    transactionDetails: "Detalles de la Transacción",
    status: "Estado",
    date: "Fecha",

    // Help Section
    helpAndSupport: "Ayuda y Soporte",
    frequentlyAskedQuestions: "Preguntas Frecuentes",
    howToSendMoney: "¿Cómo envío dinero?",
    howToSendMoneyAnswer:
      "Toca el ícono Enviar en la navegación inferior, selecciona un destinatario o ingresa los detalles bancarios, ingresa el monto y confirma tu transacción.",
    howToReceiveMoney: "¿Cómo recibo dinero?",
    howToReceiveMoneyAnswer:
      "Toca el ícono Recibir en la navegación inferior, luego comparte tu dirección de billetera o código QR con el remitente.",
    whatAreFees: "¿Cuáles son las tarifas?",
    whatAreFeesAnswer:
      "Cobramos una tarifa fija de $0.50 por transacción. Los tipos de cambio se actualizan en tiempo real.",
    isMoneyafe: "¿Mi dinero está seguro?",
    isMoneySafeAnswer:
      "Sí, utilizamos protocolos de seguridad estándar de la industria y tus fondos se mantienen en billeteras seguras.",
    contactSupport: "Contactar Soporte",
    supportTeamAvailable:
      "Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier pregunta o problema.",
    emailLabel: "Correo:",
    phoneLabel: "Teléfono:",
    whatsappLabel: "WhatsApp:",
    transactionSuccessful: "Transacción Exitosa",
    moneyOnTheWay: "Tu dinero está en camino",
    transactionId: "ID de Transacción",
    completed: "Completada",
    bank: "Banco",

    // Exchange rate update notifications
    increased: "aumentó",
    decreased: "disminuyó",
    checkNewAmount: "Por favor, verifica el nuevo monto que recibirá el destinatario.",
  },

  pt: {
    // Common
    back: "Voltar",
    next: "Próximo",
    cancel: "Cancelar",
    save: "Salvar",
    confirm: "Confirmar",
    help: "Ajuda",

    // Authentication
    signIn: "Entrar",
    secureAccess: "Acesse sua carteira com segurança usando uma senha de uso único",
    phoneNumber: "Número de Telefone",
    requestOTP: "Solicitar OTP",
    sendingOTP: "Enviando OTP",
    oneTimePassword: "Senha de uso único",
    enterCode: "Digite o código de 6 dígitos",
    weSentCode: "Enviamos um código para",
    verifyOTP: "Verificar OTP",
    verifying: "Verificando",
    changePhone: "Alterar número de telefone",
    invalidOTP: "OTP inválido. Por favor, tente novamente.",
    enterPhoneNumber: "Digite seu número de telefone sem o código do país",

    // Dashboard
    balance: "Saldo USDC",
    send: "Enviar",
    receive: "Receber",
    refresh: "Atualizar",
    transactions: "Transações",
    all: "Todas",
    sent: "Enviadas",
    received: "Recebidas",
    noTransactions: "Nenhuma transação encontrada",

    // Send Money
    sendMoney: "Enviar dinheiro",
    makeTransfer: "Fazer uma transferência bancária",
    scheduledPayments: "Configure também pagamentos programados",
    recent: "RECENTES",
    destinationCountry: "País de Destino",
    recipientReceives: "O destinatário recebe",
    localCurrency: "Moeda local",
    amount: "Valor",
    processingFee: "Taxa de processamento",
    total: "Total",
    exchangeRate: "Taxa de Câmbio",
    amountToBeExchanged: "Valor a ser trocado",

    // Bank Details
    addBankDetails: "Adicionar dados bancários",
    person: "Pessoa",
    business: "Empresa",
    checkDetails: "Verificar dados",
    addAmountDetails: "Adicionar detalhes do valor",

    // Contact Information
    contactInformation: "Informações de Contato",
    firstName: "Nome",
    lastName: "Sobrenome",
    documentType: "Tipo de documento",
    nationalID: "Identidade nacional",
    passport: "Passaporte",
    documentNumber: "Número do documento",
    emailAddress: "Endereço de e-mail",

    // Business Information
    businessInformation: "Informações da Empresa",
    companyName: "Nome da empresa",
    nationalIdentificationNumber: "Número de Identificação Nacional",
    address: "Endereço",
    phone: "Telefone",
    email: "E-mail",

    // Bank Details
    bankDetails: "Dados bancários",
    selectBank: "Selecionar banco",
    accountType: "Tipo de conta",
    individual: "Individual",
    company: "Empresa",
    accountNumber: "Número da conta",

    // Payment Review
    reviewPayment: "Revisar pagamento",
    schedule: "Agendar",
    reference: "Referência",
    personalAccount: "Conta Pessoal",
    allDetailsMatch: "Todos os dados correspondem",
    processing: "Processando...",
    insufficientBalance: "Saldo insuficiente",
    enterValidAmount: "Por favor, insira um valor válido",
    showSummary: "Mostrar resumo",
    hideSummary: "Ocultar resumo",

    // Receive
    receiveUSDC: "Receber USDC",
    shareAddress: "Compartilhe seu endereço Solana para receber USDC",
    scanToReceive: "Escaneie para receber USDC",
    copy: "Copiar",
    copied: "Copiado",
    share: "Compartilhar",
    backToDashboard: "Voltar ao Painel",

    // Profile
    profile: "Perfil",
    logout: "Sair",
    loggingOut: "Saindo...",

    // Add new translation keys for transaction details
    recipient: "Destinatário",
    transactionDetails: "Detalhes da Transação",
    status: "Status",
    date: "Data",

    // Help Section
    helpAndSupport: "Ajuda e Suporte",
    frequentlyAskedQuestions: "Perguntas Frequentes",
    howToSendMoney: "Como envio dinheiro?",
    howToSendMoneyAnswer:
      "Toque no ícone Enviar na navegação inferior, selecione um destinatário ou insira os detalhes bancários, digite o valor e confirme sua transação.",
    howToReceiveMoney: "Como recebo dinheiro?",
    howToReceiveMoneyAnswer:
      "Toque no ícone Receber na navegação inferior, depois compartilhe seu endereço de carteira ou código QR com o remetente.",
    whatAreFees: "Quais são as taxas?",
    whatAreFeesAnswer:
      "Cobramos uma taxa fixa de $0,50 por transação. As taxas de câmbio são atualizadas em tempo real.",
    isMoneyafe: "Meu dinheiro está seguro?",
    isMoneySafeAnswer:
      "Sim, usamos protocolos de segurança padrão da indústria e seus fundos são mantidos em carteiras seguras.",
    contactSupport: "Contatar Suporte",
    supportTeamAvailable:
      "Nossa equipe de suporte está disponível 24/7 para ajudá-lo com quaisquer dúvidas ou problemas.",
    emailLabel: "Email:",
    phoneLabel: "Telefone:",
    whatsappLabel: "WhatsApp:",
    transactionSuccessful: "Transação Bem-sucedida",
    moneyOnTheWay: "Seu dinheiro está a caminho",
    transactionId: "ID da Transação",
    completed: "Concluída",
    bank: "Banco",

    // Exchange rate update notifications
    increased: "aumentou",
    decreased: "diminuiu",
    checkNewAmount: "Por favor, verifique o novo valor que o destinatário receberá.",
  },
}

export type TranslationKey = keyof typeof translations.en

