import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Upload,
  Check,
  AlertTriangle,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  Save,
  ArrowRight,
  Circle
} from 'lucide-react';
import { licitacionRepository, documentoRepository } from '@/infrastructure/repositories';
import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';
import { cn } from '@/lib/utils';

const estadoBadges = {
  nueva: { label: 'Nueva', className: 'badge-new' },
  en_progreso: { label: 'En progreso', className: 'badge-progress' },
  casi_cierra: { label: 'Cierra pronto', className: 'badge-urgent' }
};

const documentoEstadoConfig: Record<Documento['estado'], { icon: any; color: string; label: string }> = {
  aprobado: { icon: Check, color: 'text-success', label: 'Aprobado' },
  pendiente: { icon: Circle, color: 'text-muted-foreground', label: 'Pendiente' },
  vencido: { icon: XCircle, color: 'text-destructive', label: 'Vencido' },
  rechazado: { icon: XCircle, color: 'text-destructive', label: 'Rechazado' },
  cargado: { icon: Circle, color: 'text-primary', label: 'Cargado' },
  requiere_accion: { icon: AlertTriangle, color: 'text-warning', label: 'Requiere acción' }
};

const categoriaLabels: Record<string, string> = {
  juridico: 'Jurídico',
  fiscal: 'Fiscal',
  oferta: 'Oferta',
  tecnico: 'Técnico',
  financiero: 'Financiero'
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export default function LicitacionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showUploadedDocs, setShowUploadedDocs] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [licitacion, setLicitacion] = useState<Licitacion | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [resumenEstado, setResumenEstado] = useState<ResumenEstado | null>(null);
  const [loading, setLoading] = useState(true);
  const uploadedFilesRef = useRef<Map<string, File>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        const [licitacionData, documentosData, resumenData] = await Promise.all([
          licitacionRepository.getById(id),
          documentoRepository.getByLicitacionId(id),
          documentoRepository.getResumenEstado(id)
        ]);

        setLicitacion(licitacionData);
        setDocumentos(documentosData);
        setResumenEstado(resumenData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!licitacion || !resumenEstado) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Licitación no encontrada</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary mt-4">
          Volver al dashboard
        </button>
      </div>
    );
  }

  const badge = estadoBadges[licitacion.estado];
  const progress = Math.round((resumenEstado.aprobados / resumenEstado.total_documentos) * 100);

  const documentsPerStep = 5;
  const totalSteps = Math.ceil(documentos.length / documentsPerStep);
  const currentDocuments = documentos.slice(
    currentStep * documentsPerStep,
    (currentStep + 1) * documentsPerStep
  );

  const uploadedDocs = documentos.filter(d =>
    d.estado === 'aprobado' || d.estado === 'cargado'
  );

  // Price benchmark calculation (mock)
  const benchmarkMin = licitacion.montoMin;
  const benchmarkMax = licitacion.montoMax;
  const proposedValue = parseInt(proposedPrice.replace(/\D/g, '')) || 0;

  const getPriceStatus = () => {
    if (!proposedValue) return null;
    if (proposedValue < benchmarkMin) return 'below';
    if (proposedValue > benchmarkMax) return 'above';
    return 'within';
  };

  const priceStatus = getPriceStatus();

  const handleSave = () => {
    setSavedMessage('Guardado hace un momento');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleFileChange = (docId: string, file: File | null) => {
    if (!file) return;

    // Guardar el archivo en el ref para uso posterior
    uploadedFilesRef.current.set(docId, file);

    // Simular carga de archivo (en producción, aquí subirías a un servidor)
    setDocumentos(prev => {
      const updated = prev.map(d =>
        d.id === docId ? { ...d, estado: 'aprobado' as const } : d
      );

      // Actualizar resumenEstado basado en los documentos actualizados
      const aprobados = updated.filter(d => d.estado === 'aprobado').length;
      const pendientes = updated.filter(d => d.estado === 'pendiente').length;
      const requiere_accion = updated.filter(d => d.estado === 'requiere_accion').length;
      const vencidos = updated.filter(d => d.estado === 'vencido').length;

      setResumenEstado({
        total_documentos: updated.length,
        aprobados,
        pendientes,
        requiere_accion,
        vencidos
      });

      // Verificar si todos los documentos del paso actual están aprobados
      const documentsPerStep = 5;
      const currentStepDocs = updated.slice(
        currentStep * documentsPerStep,
        (currentStep + 1) * documentsPerStep
      );
      const allCurrentStepApproved = currentStepDocs.every(d => d.estado === 'aprobado');

      // Avanzar al siguiente paso automáticamente si todos están aprobados
      if (allCurrentStepApproved && currentStep < Math.ceil(updated.length / documentsPerStep) - 1) {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 500); // Pequeño delay para que se vea el cambio
      }

      return updated;
    });
    handleSave();
  };

  const triggerFileInput = (docId: string) => {
    const input = document.getElementById(`file-input-${docId}`) as HTMLInputElement;
    input?.click();
  };

  const generateZipAndDownload = async () => {
    const zip = new JSZip();

    // Obtener todos los documentos aprobados con archivos
    const documentosConArchivos = documentos.filter(d => d.estado === 'aprobado');

    if (documentosConArchivos.length === 0) {
      alert('No hay documentos cargados para descargar');
      return;
    }

    // Agregar cada archivo al ZIP
    for (const doc of documentosConArchivos) {
      const file = uploadedFilesRef.current.get(doc.id);
      if (file) {
        // Organizar por categoría
        const folder = categoriaLabels[doc.categoria] || 'Otros';
        zip.folder(folder)?.file(file.name, file);
      }
    }

    // Generar el ZIP
    try {
      const blob = await zip.generateAsync({ type: 'blob' });

      // Crear nombre del archivo con el nombre de la licitación
      const zipFileName = `${licitacion?.nombre || 'Documentos'}_${new Date().toISOString().split('T')[0]}.zip`;

      // Descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = zipFileName;
      link.click();

      // Limpiar el objeto URL
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error al generar ZIP:', error);
      alert('Error al generar el archivo ZIP');
    }
  };

  const handleVerResumen = () => {
    generateZipAndDownload();
    //navigate(`/licitacion/${id}/resumen`);
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="px-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />

        </button>
        <div>
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={badge.className}>{badge.label}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {licitacion.sector}
                </span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {licitacion.tipoContrato}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">{licitacion.nombre}</h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {licitacion.entidad}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {licitacion.region}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Cierra {new Date(licitacion.fechaCierre).toLocaleDateString('es-CO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3 border border-primary/20">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary shrink-0" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rango de referencia (benchmark)</p>
                <p className="text-lg font-bold text-foreground">
                  {formatMoney(benchmarkMin)} – {formatMoney(benchmarkMax)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {savedMessage && (
          <p className="text-sm text-success mt-2 animate-fade-in">{savedMessage}</p>
        )}
      </div>

      {/* Summary */}
      <div className="card-elevated p-6">
        <p className="text-muted-foreground leading-relaxed">
          {licitacion.resumen}
        </p>
      </div>

      {/* Global Progress */}
      {/* <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Estado de tu oferta</h3>
          <span className="text-sm font-medium text-primary">{progress}% completado</span>
        </div>

        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{resumenEstado.aprobados}</p>
            <p className="text-xs text-muted-foreground">Aprobados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{resumenEstado.pendientes}</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">{resumenEstado.requiere_accion}</p>
            <p className="text-xs text-muted-foreground">Requieren acción</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{resumenEstado.vencidos}</p>
            <p className="text-xs text-muted-foreground">Vencidos</p>
          </div>
        </div>
      </div> */}

      {/* Document Wizard */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Checklist de documentos</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Paso {currentStep + 1} de {totalSteps}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex gap-0.5 mb-6 w-full">
          {Array.from({ length: 50 }).map((_, i) => {
            const totalBars = 50;
            const stepProgress = ((currentStep + 1) / totalSteps) * 100;
            const completedBars = Math.floor((stepProgress / 100) * totalBars);
            const isCompleted = i < completedBars;
            const percentage = (i / (totalBars - 1)) * 100;

            // Degradado usando variaciones del primary (morado/azul)
            // primary: hsl(243 90% 66%)
            // Variar la luminosidad de claro a oscuro
            const getGradientColor = () => {
              // De morado claro (75% light) a morado oscuro (35% light)
              const maxLight = 75;
              const minLight = 35;
              const lightness = maxLight - ((maxLight - minLight) * percentage / 100);

              // Mantener el hue y saturación del primary
              return `hsl(243 90% ${lightness}%)`;
            };

            return (
              <div
                key={i}
                className={cn(
                  "flex-1 h-8 rounded-sm transition-all duration-300",
                  !isCompleted && "bg-muted"
                )}
                style={{
                  backgroundColor: isCompleted ? getGradientColor() : undefined
                }}
              />
            );
          })}
        </div>

        {/* Documents list */}
        <div className="space-y-3 mb-6">
          {currentDocuments.map((doc) => {
            const config = documentoEstadoConfig[doc.estado];
            const Icon = config.icon;

            return (
              <div
                key={doc.id}
                className="p-4 bg-muted/30 rounded-xl flex items-start gap-4"
              >
                <div className={cn("p-2 rounded-lg",
                  doc.estado === 'aprobado' ? 'bg-success/10' :
                    doc.estado === 'requiere_accion' || doc.estado === 'vencido' ? 'bg-destructive/10' :
                      'bg-muted'
                )}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{doc.nombre}</p>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                      {categoriaLabels[doc.categoria]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.observaciones}</p>
                </div>

                <input
                  type="file"
                  id={`file-input-${doc.id}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <button
                  onClick={() => triggerFileInput(doc.id)}
                  disabled={doc.estado === 'aprobado'}
                  className={cn(
                    "btn-secondary text-sm py-2",
                    doc.estado === 'aprobado' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Upload className="w-4 h-4" />
                  {doc.estado === 'aprobado' ? 'Cargado' : 'Cargar'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="btn-ghost disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>

          <button
            onClick={() => {
              if (isLastStep) {
                handleVerResumen();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="btn-primary"
          >
            {isLastStep ? 'Ver resumen final' : 'Siguiente'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Uploaded documents */}
      <div className="card-elevated overflow-hidden">
        <button
          onClick={() => setShowUploadedDocs(!showUploadedDocs)}
          className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
        >
          <span className="font-medium text-foreground">
            Ver documentos cargados ({uploadedDocs.length})
          </span>
          {showUploadedDocs ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {showUploadedDocs && (
          <div className="border-t border-border p-4 space-y-2 animate-fade-in">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm text-foreground">{doc.nombre}</span>
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                  {documentoEstadoConfig[doc.estado].label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
