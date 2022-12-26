import * as React from "react"

import { defaultTranslations } from "../constants/defaultTranslations"
import type { Translations } from "../typings"

type TranslationsContextProps = {
  children: React.ReactNode
  overrides?: Translations
}

export const TranslationsContext = React.createContext(defaultTranslations)

export function TranslationsProvider({
  children,
  overrides,
}: TranslationsContextProps) {
  const mergedContext = { ...defaultTranslations, ...overrides }
  return (
    <TranslationsContext.Provider value={mergedContext}>
      {children}
    </TranslationsContext.Provider>
  )
}
