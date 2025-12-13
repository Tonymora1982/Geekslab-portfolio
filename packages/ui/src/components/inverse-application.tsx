'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ApplicationFormSchema,
    scoreApplication,
    generateDecisionLetter,
    type ApplicationForm,
    type ScoringResult
} from '../lib/rfc-scoring';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/language-context';

export function InverseApplication() {
    const { language } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<ApplicationForm>>({
        stack: [],
        complianceStandards: [],
        allowsExperimentation: false,
        requiresCompliance: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [result, setResult] = useState<ScoringResult | null>(null);
    const [showLetter, setShowLetter] = useState(false);

    const totalSteps = 3;

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.companyName) { newErrors.companyName = 'Requerido'; isValid = false; }
            if (!formData.contactName) { newErrors.contactName = 'Requerido'; isValid = false; }
            if (!formData.contactEmail) { newErrors.contactEmail = 'Requerido'; isValid = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) { newErrors.contactEmail = 'Email inválido'; isValid = false; }
            if (!formData.contactRole) { newErrors.contactRole = 'Requerido'; isValid = false; }
        } else if (currentStep === 2) {
            if (!formData.projectTitle) { newErrors.projectTitle = 'Requerido'; isValid = false; }
            if (!formData.projectDescription) { newErrors.projectDescription = 'Requerido'; isValid = false; }
            else if (formData.projectDescription.length < 50) { newErrors.projectDescription = 'Mínimo 50 caracteres'; isValid = false; }
            if (!formData.stack || formData.stack.length === 0) { newErrors.stack = 'Requerido'; isValid = false; }
            if (!formData.timeline) { newErrors.timeline = 'Requerido'; isValid = false; }
            if (!formData.budget) { newErrors.budget = 'Requerido'; isValid = false; }
        } else if (currentStep === 3) {
            if (!formData.autonomy) { newErrors.autonomy = 'Requerido'; isValid = false; }
            if (!formData.meetingFrequency) { newErrors.meetingFrequency = 'Requerido'; isValid = false; }
            if (!formData.sharingPermission) { newErrors.sharingPermission = 'Requerido'; isValid = false; }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const updateField = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async () => {
        if (validateStep(step)) {
            try {
                const validated = ApplicationFormSchema.parse(formData);

                // Submit to backend
                const response = await fetch('/api/rfc/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(validated),
                });

                const data = await response.json();

                if (data.success && data.result) {
                    setResult(data.result);
                } else {
                    console.error("Submission failed", data.error);
                    // Fallback to local calculation if API fails
                    const localResult = scoreApplication(validated);
                    setResult(localResult);
                }

            } catch (error: any) {
                console.error("Validation or API error", error);
            }
        }
    };

    const addStackItem = (tech: string) => {
        if (tech.trim()) {
            updateField('stack', [...(formData.stack || []), tech.trim()]);
        }
    };

    const removeStackItem = (index: number) => {
        updateField('stack', formData.stack?.filter((_, i) => i !== index) || []);
    };

    return (
        <div id="rfc-apply" className="w-full max-w-4xl mx-auto space-y-8 p-6 bg-zinc-950/50 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'es' ? 'Aplica para colaborar' : 'Apply to collaborate'}
                </h3>
                <p className="text-zinc-400">
                    {language === 'es'
                        ? 'Proceso de selección inversa para proyectos de alto impacto'
                        : 'Inverse selection process for high-impact projects'}
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-800 h-1 rounded-full mb-8">
                            <div
                                className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            />
                        </div>

                        {/* Step 1: Company & Contact */}
                        {step === 1 && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-semibold text-zinc-100 border-b border-white/10 pb-2">1. Información General</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Nombre de la empresa"
                                        value={formData.companyName || ''}
                                        onChange={(v) => updateField('companyName', v)}
                                        error={errors.companyName}
                                        required
                                    />
                                    <InputField
                                        label="Sitio web"
                                        value={formData.website || ''}
                                        onChange={(v) => updateField('website', v)}
                                        error={errors.website}
                                        placeholder="https://ejemplo.com"
                                    />
                                    <InputField
                                        label="Tu Nombre"
                                        value={formData.contactName || ''}
                                        onChange={(v) => updateField('contactName', v)}
                                        error={errors.contactName}
                                        required
                                    />
                                    <InputField
                                        label="Email Corporativo"
                                        type="email"
                                        value={formData.contactEmail || ''}
                                        onChange={(v) => updateField('contactEmail', v)}
                                        error={errors.contactEmail}
                                        required
                                    />
                                    <InputField
                                        label="Tu Rol"
                                        value={formData.contactRole || ''}
                                        onChange={(v) => updateField('contactRole', v)}
                                        error={errors.contactRole}
                                        required
                                        className="md:col-span-2"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Project Details */}
                        {step === 2 && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-semibold text-zinc-100 border-b border-white/10 pb-2">2. Detalles del Proyecto</h3>
                                <InputField
                                    label="Título del proyecto"
                                    value={formData.projectTitle || ''}
                                    onChange={(v) => updateField('projectTitle', v)}
                                    error={errors.projectTitle}
                                    required
                                />
                                <TextareaField
                                    label="Descripción del proyecto"
                                    value={formData.projectDescription || ''}
                                    onChange={(v) => updateField('projectDescription', v)}
                                    error={errors.projectDescription}
                                    rows={4}
                                    required
                                />
                                <TagInput
                                    label="Stack Tecnológico Sugerido"
                                    tags={formData.stack || []}
                                    onAdd={addStackItem}
                                    onRemove={removeStackItem}
                                    error={errors.stack}
                                    placeholder="Next.js, TypeScript, PostgreSQL..."
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Duración estimada"
                                        value={formData.timeline || ''}
                                        onChange={(v) => updateField('timeline', v)}
                                        error={errors.timeline}
                                        options={[
                                            { value: '1-2-weeks', label: '1-2 semanas' },
                                            { value: '1-month', label: '1 mes' },
                                            { value: '2-3-months', label: '2-3 meses' },
                                            { value: '3-6-months', label: '3-6 meses' },
                                            { value: '6-months-plus', label: '6+ meses' },
                                        ]}
                                        required
                                    />
                                    <SelectField
                                        label="Presupuesto"
                                        value={formData.budget || ''}
                                        onChange={(v) => updateField('budget', v)}
                                        error={errors.budget}
                                        options={[
                                            { value: 'under-5k', label: 'Menos de $5k' },
                                            { value: '5k-10k', label: '$5k - $10k' },
                                            { value: '10k-20k', label: '$10k - $20k' },
                                            { value: '20k-50k', label: '$20k - $50k' },
                                            { value: '50k-plus', label: '$50k+' },
                                        ]}
                                        required
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Work Style & Compliance */}
                        {step === 3 && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-semibold text-zinc-100 border-b border-white/10 pb-2">3. Cultura y Procesos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Nivel de autonomía"
                                        value={formData.autonomy || ''}
                                        onChange={(v) => updateField('autonomy', v)}
                                        error={errors.autonomy}
                                        options={[
                                            { value: 'low', label: 'Baja - Supervisión constante' },
                                            { value: 'medium', label: 'Media - Check-ins regulares' },
                                            { value: 'high', label: 'Alta - Check-ins semanales' },
                                            { value: 'full', label: 'Completa - Autonomía total' },
                                        ]}
                                        required
                                    />
                                    <SelectField
                                        label="Frecuencia de reuniones"
                                        value={formData.meetingFrequency || ''}
                                        onChange={(v) => updateField('meetingFrequency', v)}
                                        error={errors.meetingFrequency}
                                        options={[
                                            { value: 'daily', label: 'Diaria' },
                                            { value: 'weekly', label: 'Semanal' },
                                            { value: 'biweekly', label: 'Quincenal' },
                                            { value: 'monthly', label: 'Mensual' },
                                            { value: 'async', label: 'Asíncrona' },
                                        ]}
                                        required
                                    />
                                </div>

                                <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-4">
                                    <h4 className="font-medium text-zinc-200">Experimentación</h4>
                                    <CheckboxField
                                        label="¿Permites experimentación durante el desarrollo?"
                                        checked={formData.allowsExperimentation || false}
                                        onChange={(v) => updateField('allowsExperimentation', v)}
                                        error={errors.allowsExperimentation}
                                    />
                                    <SelectField
                                        label="Permisos para compartir aprendizajes"
                                        value={formData.sharingPermission || ''}
                                        onChange={(v) => updateField('sharingPermission', v)}
                                        error={errors.sharingPermission}
                                        options={[
                                            { value: 'public', label: 'Público - Permite blog posts y demos' },
                                            { value: 'anonymized', label: 'Anonimizado - Sin datos sensibles' },
                                            { value: 'private', label: 'Privado - No compartir' },
                                        ]}
                                        required
                                    />
                                </div>

                                <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 space-y-4">
                                    <h4 className="font-medium text-zinc-200">Compliance</h4>
                                    <CheckboxField
                                        label="¿Requiere cumplimiento normativo?"
                                        checked={formData.requiresCompliance || false}
                                        onChange={(v) => updateField('requiresCompliance', v)}
                                        error={errors.requiresCompliance}
                                    />
                                    {formData.requiresCompliance && (
                                        <InputField
                                            label="Estándares (ISO 13485, GDPR, etc.)"
                                            value={formData.complianceStandards?.join(', ') || ''}
                                            onChange={(v) => updateField('complianceStandards', v.split(',').map(s => s.trim()))}
                                            placeholder="ISO 13485, GDPR, HIPAA"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t border-white/10">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-2 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Atrás
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < totalSteps ? (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
                                >
                                    Siguiente <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                                >
                                    Enviar Aplicación <CheckCircle2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                    </motion.div>
                ) : (
                    <ScoringResults
                        result={result}
                        application={formData as ApplicationForm}
                        onReset={() => { setResult(null); setStep(1); setFormData({}); }}
                        showLetter={showLetter}
                        onToggleLetter={() => setShowLetter(!showLetter)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper Components
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    className?: string;
}

function InputField({
    label,
    value,
    onChange,
    error,
    required,
    type = 'text',
    placeholder,
    className
}: InputFieldProps) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
                {label} {required && <span className="text-emerald-400">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors",
                    error && "border-red-500 focus:border-red-500"
                )}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

interface TextareaFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    rows?: number;
}

function TextareaField({ label, value, onChange, error, required, rows = 3 }: TextareaFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
                {label} {required && <span className="text-emerald-400">*</span>}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={cn(
                    "w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none",
                    error && "border-red-500 focus:border-red-500"
                )}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    options: Array<{ value: string; label: string }>;
}

function SelectField({ label, value, onChange, error, required, options }: SelectFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
                {label} {required && <span className="text-emerald-400">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors appearance-none",
                        error && "border-red-500 focus:border-red-500"
                    )}
                >
                    <option value="">Selecciona una opción</option>
                    {options.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
            </div>
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

interface CheckboxFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
}

function CheckboxField({ label, checked, onChange, error }: CheckboxFieldProps) {
    return (
        <div>
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className={cn(
                    "w-5 h-5 border border-zinc-700 rounded flex items-center justify-center transition-colors",
                    checked ? "bg-emerald-500 border-emerald-500" : "bg-zinc-900 group-hover:border-zinc-500"
                )}>
                    {checked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                </div>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="hidden"
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{label}</span>
            </label>
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

interface TagInputProps {
    label: string;
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (index: number) => void;
    error?: string;
    placeholder?: string;
}

function TagInput({ label, tags, onAdd, onRemove, error, placeholder }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (input.trim()) {
                onAdd(input);
                setInput('');
            }
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={cn(
                    "w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors",
                    error && "border-red-500 focus:border-red-500"
                )}
            />
            <p className="mt-1 text-xs text-zinc-500">Presiona Enter o coma para añadir</p>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full border border-emerald-500/20"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => onRemove(i)}
                                className="hover:text-emerald-300 transition-colors"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

function ScoringResults({
    result,
    application,
    onReset,
    showLetter,
    onToggleLetter
}: {
    result: ScoringResult;
    application: ApplicationForm;
    onReset: () => void;
    showLetter: boolean;
    onToggleLetter: () => void;
}) {
    const decisionConfig = {
        accepted: {
            icon: CheckCircle2,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-400/10',
            borderColor: 'border-emerald-400/20',
            label: '¡Excelente fit!',
        },
        'potential-fit': {
            icon: AlertCircle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
            borderColor: 'border-yellow-400/20',
            label: 'Fit potencial',
        },
        'not-aligned': {
            icon: XCircle,
            color: 'text-red-400',
            bgColor: 'bg-red-400/10',
            borderColor: 'border-red-400/20',
            label: 'No alineado',
        },
    };

    const config = decisionConfig[result.decision];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Score Card */}
            <div className={`p-8 rounded-xl border-2 ${config.borderColor} ${config.bgColor}`}>
                <div className="flex items-center gap-4 mb-4">
                    <Icon className={`w-12 h-12 ${config.color}`} />
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-100">{config.label}</h2>
                        <p className="text-zinc-400">
                            Puntuación: {result.totalScore}/{result.maxScore} ({result.percentage}%)
                        </p>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mt-6">
                    {Object.entries(result.breakdown).map(([key, data]) => (
                        <div key={key} className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-zinc-300 capitalize">{key}</span>
                                    <span className="text-sm text-zinc-500">
                                        {data.score}/{data.max}
                                    </span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2">
                                    <div
                                        className="bg-emerald-500 h-2 rounded-full transition-all"
                                        style={{ width: `${(data.score / data.max) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">{data.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                    <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg">
                        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Recomendaciones</h3>
                        <ul className="space-y-1">
                            {result.recommendations.map((rec, i) => (
                                <li key={i} className="text-sm text-zinc-400 flex gap-2">
                                    <span className="text-yellow-400">•</span>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Decision Letter */}
            <div>
                <button
                    onClick={onToggleLetter}
                    className="w-full px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-lg transition-colors flex items-center justify-between border border-zinc-700"
                >
                    <span>{showLetter ? 'Ocultar' : 'Ver'} carta de decisión</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showLetter ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {showLetter && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 overflow-hidden"
                        >
                            <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans">
                                {generateDecisionLetter(application, result)}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-semibold rounded-lg transition-colors"
            >
                Nueva aplicación
            </button>
        </motion.div>
    );
}
