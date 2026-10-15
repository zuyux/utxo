import type { Language } from "@/lib/i18n"

const es = {
  back: "Volver al explorador", profile: "Perfil BNS", status: "Estado", registered: "Registrado",
  active: "Activo", expired: "Expirado", revoked: "Revocado", owner: "Stacks · propietario BNS",
  stacks: "Stacks · dirección del perfil", website: "Redirección web registrada", description: "Descripción",
  unavailableProfile: "No se pudo cargar el perfil. Los datos de registro siguen disponibles.",
  missingProfile: "Este nombre no tiene un perfil vigente disponible.", unavailable: "No disponible",
  empty: "No registrado", explore: "Explorar dirección Bitcoin", all: "Todos los datos registrados",
  unregistered: "Este alias BNS no está registrado.",
  outage: "BNS no está disponible en este momento. Inténtalo de nuevo en unos minutos.",
  buy: "Comprar un dominio BNS en btc.us", refresh: "Actualizar datos",
}

type BnsTranslations = Record<keyof typeof es, string>
export const bnsTranslations: Record<Language, BnsTranslations> = {
  es,
  en: {
    back: "Back to explorer", profile: "BNS profile", status: "Status", registered: "Registered",
    active: "Active", expired: "Expired", revoked: "Revoked", owner: "Stacks · BNS owner",
    stacks: "Stacks · profile address", website: "Website Redirect registered", description: "Description",
    unavailableProfile: "The profile could not be loaded. Registration data is still available.",
    missingProfile: "This name has no current profile available.", unavailable: "Unavailable",
    empty: "Not registered", explore: "Explore Bitcoin address", all: "All registered data",
    unregistered: "This BNS alias is not registered.",
    outage: "BNS is currently unavailable. Try again in a few minutes.",
    buy: "Buy a BNS domain on btc.us", refresh: "Refresh data",
  },
  pt: {
    back: "Voltar ao explorador", profile: "Perfil BNS", status: "Status", registered: "Registrado",
    active: "Ativo", expired: "Expirado", revoked: "Revogado", owner: "Stacks · proprietário BNS",
    stacks: "Stacks · endereço do perfil", website: "Redirecionamento de site registrado", description: "Descrição",
    unavailableProfile: "Não foi possível carregar o perfil. Os dados de registro continuam disponíveis.",
    missingProfile: "Este nome não tem um perfil vigente disponível.", unavailable: "Indisponível",
    empty: "Não registrado", explore: "Explorar endereço Bitcoin", all: "Todos os dados registrados",
    unregistered: "Este alias BNS não está registrado.",
    outage: "O BNS está indisponível no momento. Tente novamente em alguns minutos.",
    buy: "Comprar um domínio BNS em btc.us", refresh: "Atualizar dados",
  },
}
