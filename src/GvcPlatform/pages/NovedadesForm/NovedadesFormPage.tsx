import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNovedades } from '@/GvcPlatform/hooks/useNovedades';
import { NOVEDAD_TIPOS } from '@/GvcPlatform/libs/novedad-tipos';
import { novedadSchema, type FormData } from '@/GvcPlatform/schemas/novedad-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const NovedadesFormPage = () => {
  const navigate = useNavigate();
  const { submitNovedadMutation: mutation } = useNovedades();

  const defaultValues = useMemo<FormData>(
    () => ({
      tipo: NOVEDAD_TIPOS[0].value,
      fechaInicio: '',
      fechaFin: '',
      descripcion: '',
      adjunto: null,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(novedadSchema),
    mode: 'onSubmit',
  });

  const form = useWatch({ control });

  const onSubmit = async (values: FormData) => {
    await mutation.mutateAsync(values, {
      onSuccess: () => {
        toast.success('Novedad registrada correctamente');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <Button
        variant="ghost"
        onClick={() => navigate('/novedades')}
        className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Volver al panel
      </Button>

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Registrar novedad</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete el formulario con la información de la novedad. Todos los campos marcados con{' '}
          <span className="text-destructive">*</span> son obligatorios.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          {/* ── TIPO ── */}
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText size={15} className="text-primary" aria-hidden="true" />
              Tipo de novedad
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            </h2>

            <fieldset aria-required="true">
              <legend className="sr-only">Seleccione el tipo de novedad</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NOVEDAD_TIPOS.map((t) => (
                  <label
                    key={t.value}
                    className={`flex items-start gap-3 rounded-lg border cursor-pointer p-3 transition-all ${
                      form.tipo === t.value
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/40 hover:bg-muted/30'
                    }`}
                  >
                    <input
                      type="radio"
                      value={t.value}
                      checked={form.tipo === t.value}
                      {...register('tipo')}
                      className="mt-0.5 h-4 w-4 accent-primary shrink-0"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
            {errors.tipo && <p className="mt-2 text-xs text-destructive">{errors.tipo.message}</p>}
          </section>

          {/* ── FECHAS ── */}
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar size={15} className="text-primary" aria-hidden="true" />
              Período de la novedad
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fechaInicio" className="text-sm font-medium text-foreground">
                  Fecha de inicio{' '}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  {...register('fechaInicio')}
                  aria-invalid={!!errors.fechaInicio}
                  aria-describedby={errors.fechaInicio ? 'error-fechaInicio' : undefined}
                  className="h-10"
                />
                {errors.fechaInicio && (
                  <p id="error-fechaInicio" className="text-xs text-destructive">
                    {errors.fechaInicio.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fechaFin" className="text-sm font-medium text-foreground">
                  Fecha de fin{' '}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="fechaFin"
                  type="date"
                  {...register('fechaFin')}
                  aria-invalid={!!errors.fechaFin}
                  aria-describedby={errors.fechaFin ? 'error-fechaFin' : undefined}
                  min={form.fechaInicio || undefined}
                  className="h-10"
                />
                {errors.fechaFin && (
                  <p id="error-fechaFin" className="text-xs text-destructive">
                    {errors.fechaFin.message}
                  </p>
                )}
              </div>
            </div>

            {/* Duration indicator */}
            {form.fechaInicio && form.fechaFin && (
              <div className="mt-3 rounded-md bg-muted/50 border border-border px-3 py-2 text-xs text-muted-foreground">
                Duración:{' '}
                <strong className="text-foreground">
                  {Math.round(
                    (new Date(form.fechaFin).getTime() - new Date(form.fechaInicio).getTime()) /
                      (1000 * 60 * 60 * 24) +
                      1,
                  )}{' '}
                  día(s)
                </strong>
              </div>
            )}
          </section>

          {/* ── DESCRIPCIÓN ── */}
          <section className="rounded-lg border border-border bg-card p-5">
            <div className="space-y-1.5">
              <Label htmlFor="descripcion" className="text-sm font-medium text-foreground">
                Descripción{' '}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Detalle las circunstancias, motivos y cualquier información relevante para el
                procesamiento de la novedad.
              </p>
              <Textarea
                id="descripcion"
                rows={4}
                {...register('descripcion')}
                placeholder="Describa la novedad con el mayor detalle posible…"
                aria-invalid={!!errors.descripcion}
                aria-describedby={errors.descripcion ? 'error-descripcion' : 'desc-hint'}
                maxLength={500}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                {errors.descripcion ? (
                  <p id="error-descripcion" className="text-xs text-destructive">
                    {errors.descripcion.message}
                  </p>
                ) : (
                  <span id="desc-hint" className="text-xs text-muted-foreground">
                    Mínimo 10 caracteres
                  </span>
                )}
                <span
                  className={`text-xs ${
                    (form.descripcion ?? '').length > 450
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {(form.descripcion ?? '').length}/500
                </span>
              </div>
            </div>
          </section>

          {/* ── SUBMIT ── */}
          <div className="flex items-center justify-end gap-3 pb-6">
            <Button
              size="lg"
              type="button"
              onClick={() => navigate('/novedades')}
              className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Enviando…
                </>
              ) : (
                'Enviar novedad'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
