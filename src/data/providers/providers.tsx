// Copyright 2024 Social Fabric, LLC

import { createContext } from "react"
import Student from "../models/Student"

export const CustomerNameContext = createContext<string>("")
export const ProviderNameContext = createContext<string>("")
export const StudentNameContext = createContext<string>("")
export const StudentsContext = createContext<Student[]>([])
