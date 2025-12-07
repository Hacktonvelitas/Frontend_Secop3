import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Shield,
  TrendingUp
} from 'lucide-react';
import { licitacionRepository, documentoRepository } from '@/infrastructure/repositories';
import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';
import { cn } from '@/lib/utils';

export default function ResumenFinal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [licitacion, setLicitacion] = useState<Licitacion | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [resumenEstado, setResumenEstado] = useState<ResumenEstado | null>(null);
  const [loading, setLoading] = useState(true);

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

  const completionScore = resumenEstado ? Math.round(
    ((resumenEstado.aprobados + documentos.filter(d => d.estado === 'cargado').length) /
    resumenEstado.total_documentos) * 100
  ) : 0;

  // Risk analysis (mock data)
  const risks = [
    { 
      id: 1, 
      titulo: 'Garantía de Seriedad de la Oferta', 
      nivel: 'alto',
      descripcion: 'Documento crítico pendiente de carga',
      probabilidad: 4,
      impacto: 5
    },
    { 
      id: 2, 
      titulo: 'Certificado de Existencia vencido', 
      nivel: 'alto',
      descripcion: 'La fecha de expedición supera los 30 días permitidos',
      probabilidad: 5,
      impacto: 4
    },
    { 
      id: 3, 
      titulo: 'Estados financieros incompletos', 
      nivel: 'medio',
      descripcion: 'Falta firma del revisor fiscal en la página 3',
      probabilidad: 3,
      impacto: 3
    }
  ];

  const overallRisk = risks.some(r => r.nivel === 'alto') ? 'alto' : 
                      risks.some(r => r.nivel === 'medio') ? 'medio' : 'bajo';

  const riskColors = {
    alto: 'bg-destructive text-destructive-foreground',
    medio: 'bg-warning text-warning-foreground',
    bajo: 'bg-success text-success-foreground'
  };

  const riskLabels = {
    alto: 'Riesgo Alto',
    medio: 'Riesgo Medio',
    bajo: 'Riesgo Bajo'
  };

  // Recommendations
  const recommendations = [
    'Actualiza el Certificado de Existencia antes de la fecha de cierre',
    'Carga la Garantía de Seriedad con el valor mínimo requerido (10% del presupuesto)',
    'Solicita al revisor fiscal la firma faltante en los estados financieros',
    'Revisa que todos los documentos estén en formato PDF legible'
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/licitacion/${id}`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a documentos
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-2">Resumen de tu oferta</h1>
        <p className="text-muted-foreground">{licitacion.nombre}</p>
      </div>

      {/* Completion Score */}
      <div className="card-elevated p-8 text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-4 relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={`${completionScore * 3.52} 352`}
              className={cn(
                completionScore >= 80 ? "text-success" :
                completionScore >= 50 ? "text-warning" :
                "text-destructive"
              )}
            />
          </svg>
          <span className="text-4xl font-bold text-foreground">{completionScore}%</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          {completionScore >= 80 ? 'Casi listo para enviar' :
           completionScore >= 50 ? 'Progreso moderado' :
           'Necesitas completar más documentos'}
        </h2>
        <p className="text-muted-foreground">
          {resumenEstado.aprobados + documentos.filter(d => d.estado === 'cargado').length} de {resumenEstado.total_documentos} documentos en estado aceptable
        </p>
      </div>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Light */}
        <div className="card-elevated p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Análisis de Riesgo</h3>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              overallRisk === 'alto' ? "bg-destructive" : "bg-muted"
            )}>
              {overallRisk === 'alto' && <span className="text-2xl">🔴</span>}
            </div>
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              overallRisk === 'medio' ? "bg-warning" : "bg-muted"
            )}>
              {overallRisk === 'medio' && <span className="text-2xl">🟡</span>}
            </div>
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              overallRisk === 'bajo' ? "bg-success" : "bg-muted"
            )}>
              {overallRisk === 'bajo' && <span className="text-2xl">🟢</span>}
            </div>
          </div>

          <div className={cn(
            "text-center p-4 rounded-xl font-semibold",
            riskColors[overallRisk]
          )}>
            {riskLabels[overallRisk]}
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="card-elevated p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Matriz de Riesgo</h3>
          </div>

          <div className="relative">
            {/* Grid */}
            <div className="grid grid-cols-5 gap-1 aspect-square">
              {Array.from({ length: 25 }).map((_, i) => {
                const row = Math.floor(i / 5);
                const col = i % 5;
                const intensity = (4 - row) + col;
                
                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-md transition-colors",
                      intensity <= 2 ? "bg-success/20" :
                      intensity <= 4 ? "bg-success/40" :
                      intensity <= 5 ? "bg-warning/40" :
                      intensity <= 6 ? "bg-warning/60" :
                      "bg-destructive/40"
                    )}
                  />
                );
              })}

              {/* Risk points */}
              {risks.map((risk) => (
                <div
                  key={risk.id}
                  className={cn(
                    "absolute w-4 h-4 rounded-full border-2 border-background",
                    risk.nivel === 'alto' ? "bg-destructive" :
                    risk.nivel === 'medio' ? "bg-warning" :
                    "bg-success"
                  )}
                  style={{
                    left: `${(risk.impacto - 1) * 20 + 10}%`,
                    bottom: `${(risk.probabilidad - 1) * 20 + 10}%`
                  }}
                  title={risk.titulo}
                />
              ))}
            </div>

            {/* Labels */}
            <p className="text-xs text-muted-foreground text-center mt-2">Impacto →</p>
            <p className="text-xs text-muted-foreground absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
              Probabilidad →
            </p>
          </div>
        </div>
      </div>

      {/* Risk List */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Puntos críticos a revisar
        </h3>

        <div className="space-y-3">
          {risks.map((risk) => (
            <div
              key={risk.id}
              className={cn(
                "p-4 rounded-xl flex items-start gap-4",
                risk.nivel === 'alto' ? "bg-destructive/10" :
                risk.nivel === 'medio' ? "bg-warning/10" :
                "bg-success/10"
              )}
            >
              {risk.nivel === 'alto' ? (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              ) : risk.nivel === 'medio' ? (
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium text-foreground">{risk.titulo}</p>
                <p className="text-sm text-muted-foreground">{risk.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground mb-4">Recomendaciones antes de enviar</h3>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          onClick={() => navigate(`/licitacion/${id}`)}
          className="btn-secondary"
        >
          <Edit className="w-4 h-4" />
          Volver a editar
        </button>

        <button className="btn-primary">
          <Download className="w-4 h-4" />
          Descargar ZIP con documentos
        </button>
      </div>
    </div>
  );
}
