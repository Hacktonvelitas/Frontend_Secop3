# Design System - SIICOP

**Versión:** 1.0
**Última actualización:** 2025-12-06
**Mantenedor:** Equipo de Frontend

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Principios de Diseño](#principios-de-diseño)
3. [Sistema de Tokens](#sistema-de-tokens)
4. [Tipografía](#tipografía)
5. [Colores](#colores)
6. [Espaciado y Layout](#espaciado-y-layout)
7. [Componentes Base](#componentes-base)
8. [Patrones de Componentes](#patrones-de-componentes)
9. [Animaciones](#animaciones)
10. [Guías de Implementación](#guías-de-implementación)
11. [Checklist de Componente Nuevo](#checklist-de-componente-nuevo)

---

## Introducción

Este documento define las normas y directrices del Design System de SIICOP. Todos los componentes nuevos DEBEN seguir estas reglas para mantener consistencia visual y arquitectónica.

### Objetivos del Design System

- **Consistencia:** Todos los componentes se ven y se comportan de manera uniforme
- **Reutilización:** Maximizar el uso de componentes base y tokens
- **Mantenibilidad:** Cambios centralizados afectan todo el sistema
- **Accesibilidad:** Cumplir con WCAG 2.1 AA mínimo
- **Escalabilidad:** Fácil agregar nuevos componentes sin romper existentes

### Stack Tecnológico

- **Tailwind CSS 3.4** - Framework de utilidades
- **shadcn/ui** - Componentes base (Radix UI)
- **class-variance-authority (CVA)** - Variantes de componentes
- **Lucide React** - Sistema de iconos
- **Inter** - Tipografía principal

---

## Principios de Diseño

### 1. Mobile First

Diseñar primero para móvil, luego expandir a desktop.

```tsx
// ✅ CORRECTO
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ INCORRECTO
<div className="grid grid-cols-3 md:grid-cols-1">
```

### 2. Design Tokens First

Usar SIEMPRE tokens CSS en vez de valores hardcodeados.

```tsx
// ✅ CORRECTO
<div className="bg-primary text-primary-foreground">

// ❌ INCORRECTO
<div className="bg-[#6366F1] text-white">
```

### 3. Composición sobre Herencia

Usar composición de componentes base en vez de crear nuevos desde cero.

```tsx
// ✅ CORRECTO - Componer Badge + Icon
<Badge variant="destructive">
  <AlertTriangle className="w-3 h-3 mr-1" />
  Urgente
</Badge>

// ❌ INCORRECTO - Crear BadgeWithIcon nuevo
<BadgeWithIcon icon={AlertTriangle} variant="destructive">
  Urgente
</BadgeWithIcon>
```

### 4. Variants sobre Custom Styles

Extender variantes existentes en vez de estilos inline.

```tsx
// ✅ CORRECTO
const cardVariants = cva("card-elevated", {
  variants: {
    interactive: {
      true: "cursor-pointer hover:shadow-elevated"
    }
  }
});

// ❌ INCORRECTO
<div className="card-elevated" style={{ cursor: 'pointer' }}>
```

### 5. No usar !important

NUNCA usar `!important` en estilos. Si necesitas override, revisa la especificidad.

```css
/* ❌ PROHIBIDO */
.custom-button {
  background: red !important;
}

/* ✅ CORRECTO - Aumentar especificidad */
.card-elevated .custom-button {
  background: red;
}
```

### 6. Accesibilidad First

Todos los componentes interactivos DEBEN:
- Ser accesibles por teclado
- Tener atributos ARIA apropiados
- Tener estados focus visibles
- Tener contraste mínimo 4.5:1

---

## Sistema de Tokens

### Design Tokens CSS

**Ubicación:** `src/index.css` (líneas 8-60)

#### Colores Semánticos

```css
/* Tokens de color - NO modificar directamente */
--primary: 243 90% 66%;           /* Azul/Morado principal */
--primary-foreground: 0 0% 100%;  /* Texto sobre primary */

--secondary: 220 14% 96%;         /* Gris claro */
--secondary-foreground: 220 14% 15%;

--destructive: 0 84% 60%;         /* Rojo para errores */
--success: 142 71% 45%;           /* Verde para éxito */
--warning: 38 92% 50%;            /* Naranja para advertencias */

--muted: 220 14% 96%;             /* Backgrounds sutiles */
--muted-foreground: 220 9% 46%;   /* Texto secundario */

--border: 220 13% 91%;            /* Bordes */
--input: 220 13% 91%;             /* Inputs */
--ring: 243 90% 66%;              /* Focus rings */
```

#### Sombras

```css
--shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04);
--shadow-elevated: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
--shadow-glow: 0 0 40px -10px hsl(243 90% 66% / 0.3);
```

#### Border Radius

```css
--radius: 1rem;  /* Base: 16px */

/* En Tailwind: */
rounded-sm   /* calc(var(--radius) - 4px) = 12px */
rounded-md   /* calc(var(--radius) - 2px) = 14px */
rounded-lg   /* var(--radius) = 16px */
rounded-xl   /* calc(var(--radius) + 4px) = 20px */
rounded-2xl  /* calc(var(--radius) + 8px) = 24px */
```

### Uso de Tokens en Tailwind

```tsx
// ✅ CORRECTO - Usar clases de Tailwind
<div className="bg-primary text-primary-foreground rounded-xl shadow-card">

// ✅ CORRECTO - Usar variables CSS custom
<div style={{ boxShadow: 'var(--shadow-elevated)' }}>

// ❌ INCORRECTO - Valores hardcodeados
<div className="bg-[#6366F1] rounded-[20px]">
```

---

## Tipografía

### Fuente Principal

**Inter** (Google Fonts)
Pesos disponibles: 300, 400, 500, 600, 700, 800

**Configuración:** `src/index.css` (línea 1)

### Escalas de Texto

```tsx
// Headings (automáticamente estilizados)
<h1>  // text-3xl font-bold tracking-tight (30px)
<h2>  // text-2xl font-semibold tracking-tight (24px)
<h3>  // text-xl font-semibold (20px)
<h4>  // text-lg font-medium (18px)

// Body text
<p className="text-base">     // 16px (default)
<p className="text-sm">       // 14px
<p className="text-xs">       // 12px
<p className="text-lg">       // 18px
```

### Pesos de Fuente

```tsx
font-light      // 300
font-normal     // 400 (default)
font-medium     // 500
font-semibold   // 600
font-bold       // 700
font-extrabold  // 800
```

### Reglas de Tipografía

1. **Headings:** Usar etiquetas semánticas (`<h1>`, `<h2>`, etc.)
2. **Body:** `font-normal` (400) para texto regular
3. **Énfasis:** `font-medium` (500) o `font-semibold` (600)
4. **Botones/CTAs:** `font-medium` (500)
5. **Badges/Labels:** `font-medium` (500)

### Ejemplos

```tsx
// ✅ CORRECTO
<h2 className="text-2xl font-semibold text-foreground mb-4">
  Título de Sección
</h2>

<p className="text-sm text-muted-foreground">
  Texto secundario o descripción
</p>

<span className="text-xs font-medium text-primary">
  Label o badge
</span>

// ❌ INCORRECTO - No usar font-black, font-thin
<h2 className="text-2xl font-black">
```

---

## Colores

### Paleta de Colores

#### Primary (Azul/Morado)

```tsx
bg-primary              // hsl(243 90% 66%) - Color principal
text-primary            // Mismo color para texto
border-primary          // Mismo color para bordes

bg-primary/10           // 10% opacidad (backgrounds sutiles)
bg-primary/20           // 20% opacidad (hover states)
bg-primary/90           // 90% opacidad (hover en botones)

text-primary-foreground // Blanco - texto sobre primary
```

**Uso:**
- Botones primarios
- Links
- Elementos activos/seleccionados
- CTAs importantes

#### Semantic Colors

**Success (Verde)**

```tsx
bg-success              // hsl(142 71% 45%)
text-success
bg-success/10           // Para backgrounds sutiles
text-success-foreground // Blanco
```

**Uso:** Estados aprobados, operaciones exitosas, confirmaciones

**Warning (Naranja)**

```tsx
bg-warning              // hsl(38 92% 50%)
text-warning
bg-warning/10
text-warning-foreground
```

**Uso:** Advertencias, estados que requieren atención, deadlines próximos

**Destructive (Rojo)**

```tsx
bg-destructive          // hsl(0 84% 60%)
text-destructive
bg-destructive/10
text-destructive-foreground
```

**Uso:** Errores, estados vencidos, acciones destructivas, rechazos

#### Neutral Colors

**Foreground (Texto Principal)**

```tsx
text-foreground         // hsl(220 14% 15%) - Texto principal
text-muted-foreground   // hsl(220 9% 46%) - Texto secundario
```

**Background**

```tsx
bg-background           // hsl(0 0% 100%) - Background principal
bg-muted                // hsl(220 14% 96%) - Backgrounds sutiles
bg-card                 // hsl(0 0% 100%) - Background de cards
```

**Borders**

```tsx
border-border           // hsl(220 13% 91%)
border-input            // hsl(220 13% 91%)
```

### Reglas de Uso de Color

1. **Contraste Mínimo:** 4.5:1 para texto normal, 3:1 para texto grande
2. **Color con Propósito:** Cada color tiene significado semántico
3. **No Inventar Colores:** Usar solo los tokens definidos
4. **Opacidad para Sutileza:** Usar `/10`, `/20` para backgrounds sutiles

### Combinaciones Comunes

```tsx
// Badge de estado nuevo
<span className="bg-primary/10 text-primary">Nueva</span>

// Badge de estado en progreso
<span className="bg-warning/10 text-warning">En progreso</span>

// Badge de estado urgente
<span className="bg-destructive/10 text-destructive">Urgente</span>

// Badge de estado aprobado
<span className="bg-success/10 text-success">Aprobado</span>

// Texto secundario/helper
<p className="text-muted-foreground">Texto de ayuda</p>

// Background sutil hover
<div className="hover:bg-muted transition-colors">
```

---

## Espaciado y Layout

### Escala de Espaciado

**Sistema base 4px (0.25rem)**

```tsx
p-1   // 4px
p-2   // 8px
p-3   // 12px
p-4   // 16px
p-6   // 24px  ← MÁS COMÚN en cards
p-8   // 32px  ← MÁS COMÚN en páginas
p-12  // 48px
p-16  // 64px
```

### Reglas de Espaciado

1. **Cards:** `p-6` (24px) padding estándar
2. **Páginas:** `p-8` (32px) padding principal
3. **Gaps en grids:** `gap-4` (16px) o `gap-6` (24px)
4. **Spacing entre secciones:** `space-y-8` (32px)
5. **Máximo ancho contenido:** `max-w-7xl mx-auto`

### Layout Patterns

#### Container Principal

```tsx
// Todas las páginas
<div className="p-8 max-w-7xl mx-auto">
  <div className="space-y-8">
    {/* Secciones separadas por 32px */}
  </div>
</div>
```

#### Grid Responsive

```tsx
// Cards de licitaciones
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

// Stats de 3 columnas
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// Contenido de 2 columnas
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

#### Stack Vertical

```tsx
// Espaciado consistente entre elementos
<div className="space-y-4">  // 16px entre items
<div className="space-y-6">  // 24px entre items
<div className="space-y-8">  // 32px entre sections
```

---

## Componentes Base

### Clases Utilitarias Custom

**Ubicación:** `src/index.css` (líneas 135-213)

#### Cards

```tsx
// Card básica con sombra
<div className="card-elevated">
  {/* contenido */}
</div>

// Card interactiva (clickeable)
<div className="card-interactive">
  {/* hover effect automático */}
</div>
```

**Propiedades:**
- `card-elevated`: rounded-2xl + border + shadow-card
- `card-interactive`: card-elevated + cursor-pointer + hover:shadow-elevated

#### Badges

```tsx
// Estados de licitación
<span className="badge-new">Nueva</span>
<span className="badge-progress">En progreso</span>
<span className="badge-urgent">Cierra pronto</span>
<span className="badge-success">Completado</span>
<span className="badge-pending">Pendiente</span>
```

**Estructura:**
- Todas: rounded-full + text-xs + font-medium + px-2.5 py-1
- Background: color/10
- Text: color sólido

#### Inputs

```tsx
<input
  type="text"
  className="input-field"
  placeholder="Placeholder text"
/>
```

**Propiedades:**
- rounded-xl
- px-4 py-3
- border-input
- focus:ring-2 focus:ring-primary/20
- Transiciones suaves

#### Botones

```tsx
// Botón primario (CTA principal)
<button className="btn-primary">
  <Icon className="w-4 h-4" />
  Texto del botón
</button>

// Botón secundario
<button className="btn-secondary">
  Acción secundaria
</button>

// Botón ghost (sin background)
<button className="btn-ghost">
  Cancelar
</button>
```

**Estructura:**
- `inline-flex items-center gap-2`
- `px-6 py-3`
- `rounded-xl`
- `font-medium`
- `disabled:opacity-50 disabled:cursor-not-allowed`

#### Progress Bar

```tsx
<div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  />
</div>
```

#### Sidebar Items

```tsx
// Item normal
<a className="sidebar-item">
  <Icon className="w-5 h-5" />
  <span>Texto</span>
</a>

// Item activo
<a className="sidebar-item-active">
  <Icon className="w-5 h-5" />
  <span>Dashboard</span>
</a>
```

### Componentes shadcn/ui

**Ubicación:** `src/components/ui/`

Siempre usar componentes de shadcn cuando estén disponibles:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Dialog } from "@/components/ui/dialog"
// ... 48+ componentes disponibles
```

**Regla de Oro:** Si existe en `src/components/ui/`, USARLO. No reinventar.

---

## Patrones de Componentes

### 1. Componente con Variantes (CVA)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "card-elevated p-6 animate-fade-in", // clases base
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary/5 border-primary/20",
        warning: "bg-warning/5 border-warning/20",
        success: "bg-success/5 border-success/20",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
}

export function StatCard({
  title,
  value,
  variant,
  size,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(statCardVariants({ variant, size, className }))}
      {...props}
    >
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
```

**Reglas:**
- Usar `cva` para variantes complejas
- Exportar `variants` para reutilización
- Siempre incluir `defaultVariants`
- Usar `cn()` para merge de clases

### 2. Componente con Forwarded Ref

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn("input-field", error && "border-destructive", className)}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
```

**Reglas:**
- Usar `React.forwardRef` para componentes que necesitan ref
- SIEMPRE establecer `displayName`
- Extender tipos nativos HTML
- Spread `...props` al final

### 3. Componente Compuesto (Compound)

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const DataCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-elevated", className)}
    {...props}
  />
));
DataCard.displayName = "DataCard";

const DataCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-6 pb-4", className)}
    {...props}
  />
));
DataCardHeader.displayName = "DataCardHeader";

const DataCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-foreground", className)}
    {...props}
  />
));
DataCardTitle.displayName = "DataCardTitle";

const DataCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 pb-6", className)}
    {...props}
  />
));
DataCardContent.displayName = "DataCardContent";

export { DataCard, DataCardHeader, DataCardTitle, DataCardContent };
```

**Uso:**
```tsx
<DataCard>
  <DataCardHeader>
    <DataCardTitle>Título</DataCardTitle>
    <Button size="sm">Acción</Button>
  </DataCardHeader>
  <DataCardContent>
    <p>Contenido aquí</p>
  </DataCardContent>
</DataCard>
```

**Reglas:**
- Exportar todas las subpartes
- Cada subparte con `displayName`
- Permitir override con `className`
- Composición flexible

### 4. Componente con Custom Hook

```tsx
// src/hooks/use-filter-state.ts
import { useState } from 'react';

export function useFilterState() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSector('');
    setSelectedRegion('');
  };

  const hasActiveFilters = searchQuery || selectedSector || selectedRegion;

  return {
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    selectedRegion,
    setSelectedRegion,
    clearFilters,
    hasActiveFilters,
  };
}
```

```tsx
// src/components/FilterPanel.tsx
import { Search, SlidersHorizontal } from 'lucide-react';
import { useFilterState } from '@/hooks/use-filter-state';

interface FilterPanelProps {
  sectores: string[];
  regiones: string[];
  onFilterChange: (filters: any) => void;
}

export function FilterPanel({ sectores, regiones, onFilterChange }: FilterPanelProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    selectedRegion,
    setSelectedRegion,
    clearFilters,
    hasActiveFilters,
  } = useFilterState();

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onFilterChange({ searchQuery: e.target.value, selectedSector, selectedRegion });
            }}
            placeholder="Buscar..."
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Selectores de filtro */}
      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-sm text-primary hover:underline">
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
```

**Reglas:**
- Extraer lógica compleja a custom hooks
- Hooks en `src/hooks/`
- Nombre: `use-nombre-descriptivo.ts`
- Retornar objetos con propiedades nombradas

---

## Animaciones

### Animaciones Predefinidas

**Ubicación:** `src/index.css` (líneas 216-286)

```tsx
// Fade in (entrada suave)
<div className="animate-fade-in">

// Slide up (entrada desde abajo)
<div className="animate-slide-up">

// Slide in right (entrada desde derecha)
<div className="animate-slide-in-right">

// Scale in (zoom in sutil)
<div className="animate-scale-in">

// Pulse sutil (loading states)
<div className="animate-pulse-subtle">
```

### Delays en Animaciones

```tsx
// Escalonar animaciones en listas
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-slide-up"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {/* contenido */}
  </div>
))}
```

### Transiciones

```tsx
// Transiciones estándar (200ms)
<button className="transition-colors duration-200 hover:bg-primary/90">

// Transiciones suaves (300ms)
<div className="transition-all duration-300 hover:scale-105">

// Transiciones lentas (500ms) - para progress bars
<div className="transition-all duration-500 ease-out" style={{ width: `${progress}%` }}>
```

### Reglas de Animación

1. **Duración estándar:** 200-300ms
2. **Easing:** `ease-out` para entradas, `ease-in` para salidas
3. **Performance:** Solo animar `transform` y `opacity`
4. **Reducción de movimiento:** Respetar `prefers-reduced-motion`

```tsx
// ✅ CORRECTO - Animar transform
<div className="transition-transform hover:scale-105">

// ❌ INCORRECTO - Animar width/height (causa reflow)
<div className="transition-all hover:w-full">
```

---

## Guías de Implementación

### Estructura de Archivos

```
src/
├── components/
│   ├── ui/                      # shadcn components (NO MODIFICAR)
│   │   └── button.tsx
│   ├── dashboard/               # Componentes de dominio
│   │   ├── LicitacionCard.tsx
│   │   ├── StatCard.tsx
│   │   └── NotificationsPanel.tsx
│   ├── layout/                  # Layout components
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   └── shared/                  # Componentes compartidos custom
│       └── FilterPanel.tsx
```

### Nomenclatura

#### Archivos

```
PascalCase.tsx          # Componentes
use-kebab-case.ts       # Hooks
kebab-case.ts           # Utilities
kebab-case.test.tsx     # Tests
```

#### Componentes

```tsx
// ✅ CORRECTO
export function LicitacionCard() {}
export function StatCard() {}
export function UserAvatar() {}

// ❌ INCORRECTO
export function licitacionCard() {}    // no camelCase
export function stat_card() {}         // no snake_case
export function Licitacion_Card() {}   // no mezclar
```

#### Props

```tsx
// ✅ CORRECTO
interface LicitacionCardProps {
  licitacion: Licitacion;
  onSelect?: (id: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

// ❌ INCORRECTO
interface Props {  // demasiado genérico
  data: any;       // no usar 'any'
  click: Function; // usar tipos específicos
}
```

### TypeScript

#### Props Interface

```tsx
// ✅ CORRECTO
interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'warning' | 'success';
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: StatCardProps) {
  // implementación
}
```

**Reglas:**
- Props opcionales con `?`
- Siempre tipar props (no `any`)
- Usar `readonly` para props que no deben cambiar
- Incluir `className?: string` para override

#### Event Handlers

```tsx
// ✅ CORRECTO
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // lógica
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ❌ INCORRECTO
const handleClick = (e: any) => {  // no usar 'any'
  // ...
};
```

#### Children

```tsx
// ✅ CORRECTO
interface CardProps {
  children: React.ReactNode;
}

// ✅ CORRECTO - múltiples children tipados
interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}
```

### Accesibilidad

#### Botones

```tsx
// ✅ CORRECTO
<button
  type="button"
  aria-label="Cerrar modal"
  onClick={handleClose}
  className="btn-ghost"
>
  <X className="w-4 h-4" />
</button>

// ❌ INCORRECTO - falta aria-label para icon-only
<button onClick={handleClose}>
  <X className="w-4 h-4" />
</button>
```

#### Estados Focus

```tsx
// ✅ CORRECTO - focus visible
<button className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary/20">

// ❌ INCORRECTO - eliminar outline sin alternativa
<button className="outline-none">
```

#### Estados Loading/Disabled

```tsx
// ✅ CORRECTO
<button
  disabled={isLoading}
  aria-busy={isLoading}
  className="btn-primary"
>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Cargando...
    </>
  ) : (
    'Guardar'
  )}
</button>
```

#### Formularios

```tsx
// ✅ CORRECTO
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-foreground">
    Correo electrónico
  </label>
  <input
    id="email"
    type="email"
    name="email"
    aria-describedby="email-error"
    aria-invalid={!!error}
    className="input-field"
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>
```

### Performance

#### Memoización

```tsx
import { memo } from 'react';

// Componente que recibe props complejas y no cambia frecuentemente
export const LicitacionCard = memo(function LicitacionCard({
  licitacion
}: LicitacionCardProps) {
  return (
    // implementación
  );
});
```

**Cuándo usar memo:**
- Componentes en listas grandes
- Props que son objetos/arrays
- Re-renders frecuentes del padre

**Cuándo NO usar memo:**
- Componentes pequeños/simples
- Props primitivas que cambian frecuentemente
- Overhead > beneficio

#### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

#### Imágenes

```tsx
// ✅ CORRECTO
<img
  src="/logo.png"
  alt="SIICOP Logo"
  width={200}
  height={60}
  loading="lazy"
  className="object-contain"
/>

// ❌ INCORRECTO - falta alt, width, height
<img src="/logo.png" />
```

---

## Checklist de Componente Nuevo

Antes de crear un componente nuevo, verificar:

### 1. Planificación

- [ ] ¿Ya existe un componente similar en `src/components/ui/`?
- [ ] ¿Puedo componer componentes existentes?
- [ ] ¿Este componente será reutilizable o es específico de una página?
- [ ] ¿Necesito variantes o un solo estilo?

### 2. Implementación

#### Estructura de Archivo

```tsx
// src/components/[categoria]/ComponentName.tsx

// 1. Imports
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// 2. Variants (si aplica)
const componentVariants = cva(/* ... */);

// 3. Props Interface
interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // props específicas
}

// 4. Componente
export function ComponentName({
  variant,
  className,
  ...props
}: ComponentNameProps) {
  return (
    <div className={cn(componentVariants({ variant, className }))} {...props}>
      {/* contenido */}
    </div>
  );
}

// 5. Export adicional si necesario
export { componentVariants };
```

#### Checklist de Código

- [ ] Tipos TypeScript completos (no `any`)
- [ ] Props interface bien documentada
- [ ] `className` prop para override de estilos
- [ ] Uso de `cn()` para merge de clases
- [ ] Spread `...props` al elemento raíz
- [ ] `displayName` si usa `forwardRef`
- [ ] Solo design tokens (no valores hardcodeados)
- [ ] Siguiendo patrones de color del sistema

### 3. Estilos

- [ ] Usar clases de Tailwind en vez de CSS custom
- [ ] Usar design tokens (`bg-primary`, no `bg-[#6366F1]`)
- [ ] Usar clases utilitarias custom cuando aplique (`card-elevated`, `btn-primary`)
- [ ] Transiciones suaves (`transition-colors duration-200`)
- [ ] Estados hover/focus/disabled manejados
- [ ] Responsive design (mobile-first)
- [ ] NO usar `!important`

### 4. Accesibilidad

- [ ] Etiquetas semánticas HTML (`<button>`, `<nav>`, `<main>`)
- [ ] Atributos ARIA cuando necesario
- [ ] `aria-label` en botones icon-only
- [ ] Estados loading con `aria-busy`
- [ ] Estados error con `aria-invalid`
- [ ] Focus visible (`focus:ring-2`)
- [ ] Contraste de color adecuado (mínimo 4.5:1)
- [ ] Navegable por teclado

### 5. Props Estándar

Todos los componentes custom DEBEN aceptar:

```tsx
interface BaseComponentProps {
  className?: string;           // OBLIGATORIO - override de estilos
  children?: React.ReactNode;   // Si acepta children
  id?: string;                  // Para accesibilidad
  'aria-label'?: string;        // Para accesibilidad
}
```

### 6. Variantes

Si el componente tiene variantes, usar CVA:

```tsx
const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "...",
        primary: "...",
        // mínimo 2 variantes
      },
      size: {
        sm: "...",
        md: "...",
        lg: "...",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
```

### 7. Estados

Componentes interactivos deben manejar:

- [ ] **Default:** Estado inicial
- [ ] **Hover:** Cambios visuales al pasar mouse
- [ ] **Active:** Estado al hacer click
- [ ] **Focus:** Anillo visible al navegar con teclado
- [ ] **Disabled:** Opacidad reducida + cursor not-allowed
- [ ] **Loading:** Spinner o skeleton

```tsx
<button
  disabled={isLoading || isDisabled}
  className={cn(
    "btn-primary",
    "hover:opacity-90",
    "active:scale-95",
    "focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-200"
  )}
>
  {isLoading ? (
    <Loader2 className="w-4 h-4 animate-spin" />
  ) : (
    'Guardar'
  )}
</button>
```

### 8. Iconos

- [ ] Usar Lucide React
- [ ] Tamaño estándar: `w-4 h-4` (16px) en botones, `w-5 h-5` (20px) en headers
- [ ] Color heredado del texto padre
- [ ] Spacing con gap: `gap-2`

```tsx
import { FileText, ArrowRight } from 'lucide-react';

<button className="btn-primary">
  <FileText className="w-4 h-4" />
  Ver documentos
</button>
```

### 9. Animaciones

- [ ] Usar animaciones predefinidas cuando sea posible
- [ ] Entrada: `animate-fade-in` o `animate-slide-up`
- [ ] Hover: `transition-colors duration-200`
- [ ] Loading: `animate-spin` (Lucide Loader2)

### 10. Testing (Post-implementación)

- [ ] Test de render básico
- [ ] Test de props
- [ ] Test de variantes
- [ ] Test de eventos (clicks, cambios)
- [ ] Test de accesibilidad (aria attributes)

```tsx
// ComponentName.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<ComponentName variant="primary" />);
    // assertions
  });
});
```

---

## Ejemplos Completos

### Ejemplo 1: Card de Estadística con Variantes

```tsx
// src/components/shared/MetricCard.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const metricCardVariants = cva(
  "card-elevated p-6 animate-fade-in transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary/5 border-primary/20",
        success: "bg-success/5 border-success/20",
        warning: "bg-warning/5 border-warning/20",
        destructive: "bg-destructive/5 border-destructive/20",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-elevated hover:border-primary/30",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
);

const iconVariants = {
  default: { bg: "bg-muted", text: "text-muted-foreground" },
  primary: { bg: "bg-primary/10", text: "text-primary" },
  success: { bg: "bg-success/10", text: "text-success" },
  warning: { bg: "bg-warning/10", text: "text-warning" },
  destructive: { bg: "bg-destructive/10", text: "text-destructive" },
};

interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  clickable = false,
  className,
  onClick,
  ...props
}: MetricCardProps) {
  const iconStyle = iconVariants[variant || "default"];

  return (
    <div
      className={cn(metricCardVariants({ variant, clickable, className }))}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "text-xs mt-2 font-medium flex items-center gap-1",
                trend.value >= 0 ? "text-success" : "text-destructive"
              )}
            >
              <span>{trend.value >= 0 ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconStyle.bg)}>
          <Icon className={cn("w-6 h-6", iconStyle.text)} />
        </div>
      </div>
    </div>
  );
}

export { metricCardVariants };
```

**Uso:**
```tsx
import { FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/shared/MetricCard';

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <MetricCard
    title="Nuevas oportunidades"
    value={12}
    icon={FileText}
    variant="primary"
    trend={{ value: 12, label: "esta semana" }}
  />

  <MetricCard
    title="En progreso"
    value={8}
    icon={TrendingUp}
    variant="warning"
  />

  <MetricCard
    title="Próximas a cerrar"
    value={3}
    icon={AlertTriangle}
    variant="destructive"
    clickable
    onClick={() => navigate('/urgentes')}
  />
</div>
```

### Ejemplo 2: Badge de Estado Compuesto

```tsx
// src/components/shared/StatusBadge.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium text-xs px-2.5 py-1 transition-colors",
  {
    variants: {
      status: {
        new: "bg-primary/10 text-primary",
        in_progress: "bg-warning/10 text-warning",
        urgent: "bg-destructive/10 text-destructive",
        completed: "bg-success/10 text-success",
        pending: "bg-muted text-muted-foreground",
      },
      withIcon: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      status: "pending",
      withIcon: true,
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
  icon?: LucideIcon;
}

export function StatusBadge({
  status,
  label,
  icon: Icon,
  withIcon = true,
  className,
  ...props
}: StatusBadgeProps) {
  const IconComponent = Icon || Circle;

  return (
    <span
      className={cn(statusBadgeVariants({ status, withIcon, className }))}
      {...props}
    >
      {withIcon && <IconComponent className="w-3 h-3" />}
      {label}
    </span>
  );
}

export { statusBadgeVariants };
```

**Uso:**
```tsx
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';

<div className="flex gap-2">
  <StatusBadge status="new" label="Nueva" icon={FileText} />
  <StatusBadge status="in_progress" label="En progreso" icon={Clock} />
  <StatusBadge status="urgent" label="Urgente" icon={AlertTriangle} />
  <StatusBadge status="completed" label="Completado" icon={CheckCircle} />
  <StatusBadge status="pending" label="Pendiente" withIcon={false} />
</div>
```

---

## Errores Comunes a Evitar

### ❌ Error 1: Valores Hardcodeados

```tsx
// ❌ INCORRECTO
<div className="bg-[#6366F1] text-white rounded-[20px]">

// ✅ CORRECTO
<div className="bg-primary text-primary-foreground rounded-xl">
```

### ❌ Error 2: Usar !important

```css
/* ❌ PROHIBIDO */
.custom-button {
  background: red !important;
}

/* ✅ CORRECTO */
.card-elevated .custom-button {
  background: hsl(var(--destructive));
}
```

### ❌ Error 3: Reinventar Componentes Existentes

```tsx
// ❌ INCORRECTO - shadcn/ui ya tiene Button
export function MyCustomButton() {
  return <button className="px-4 py-2 bg-blue-500">...</button>
}

// ✅ CORRECTO - Usar y extender shadcn
import { Button } from '@/components/ui/button';
<Button variant="default">...</Button>
```

### ❌ Error 4: Props sin Tipos

```tsx
// ❌ INCORRECTO
export function Card({ data, onClick }: any) {

// ✅ CORRECTO
interface CardProps {
  data: Licitacion;
  onClick: (id: string) => void;
  className?: string;
}

export function Card({ data, onClick, className }: CardProps) {
```

### ❌ Error 5: Olvidar Estados Interactivos

```tsx
// ❌ INCORRECTO - solo estado default
<button className="bg-primary text-white px-4 py-2">

// ✅ CORRECTO - todos los estados
<button className="btn-primary hover:opacity-90 focus:ring-2 disabled:opacity-50">
```

### ❌ Error 6: No Usar cn() para Merge

```tsx
// ❌ INCORRECTO
<div className={`card-elevated ${className}`}>

// ✅ CORRECTO
<div className={cn("card-elevated", className)}>
```

### ❌ Error 7: Accesibilidad Pobre

```tsx
// ❌ INCORRECTO - botón sin label
<button onClick={handleClose}>
  <X className="w-4 h-4" />
</button>

// ✅ CORRECTO
<button onClick={handleClose} aria-label="Cerrar modal">
  <X className="w-4 h-4" />
  <span className="sr-only">Cerrar</span>
</button>
```

### ❌ Error 8: Animaciones Pesadas

```tsx
// ❌ INCORRECTO - animar width causa reflow
<div className="transition-all hover:w-full">

// ✅ CORRECTO - solo transform y opacity
<div className="transition-transform hover:scale-105">
```

---

## Recursos y Referencias

### Documentación Oficial

- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Lucide Icons:** https://lucide.dev
- **CVA:** https://cva.style/docs

### Herramientas

- **Tailwind CSS IntelliSense:** Extensión VS Code
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Palette Generator:** https://coolors.co

### Archivos Clave del Proyecto

- **Design Tokens:** `src/index.css`
- **Tailwind Config:** `tailwind.config.ts`
- **Componentes UI:** `src/components/ui/`
- **Utilidades:** `src/lib/utils.ts`

---

## Versionado del Design System

### Versión 1.0 (Actual)

- Sistema de colores semánticos
- 48+ componentes shadcn/ui
- Clases utilitarias custom
- Animaciones predefinidas
- Dark mode support

### Changelog

**2025-12-06 - v1.0**
- Creación inicial del design system
- Documentación completa de tokens
- Guías de componentes
- Checklist de implementación

---

## Contacto y Contribución

Para preguntas, mejoras o reportar inconsistencias:

1. Crear issue en el repositorio
2. Tag: `design-system`
3. Incluir ejemplo de código si aplica

**Mantenedores:**
- Equipo de Frontend
- Tech Lead

---

**Fin del Documento**

*Última actualización: 2025-12-06*
*Versión: 1.0*
