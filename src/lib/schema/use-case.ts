import { z } from 'zod';

const stakeholderSchema = z.object({
	name: z.string(),
	interest: z.string()
});

const relationshipSchema = z.object({
	association: z.array(z.string()),
	extends: z.array(z.string()),
	include: z.array(z.string()),
	generalization: z.array(z.string())
});

const triggerType = z.enum(['external', 'temporal'] as const);
export type TriggerType = z.infer<typeof triggerType>;
const triggerSchema = z.object({
	name: z.string(),
	type: triggerType
});

const flowOfEventsSchema = z.object({
	name: z.string(),
	type: z.string()
});
export type FlowOfEventsSchema = z.infer<typeof flowOfEventsSchema>;

const alternativeFlowSchema = z.object({
	name: z.string(),
	events: z.array(flowOfEventsSchema)
});

const levelSchema = z.enum(['low', 'medium', 'high'] as const);
export type LevelSchema = z.infer<typeof levelSchema>;

export const useCaseSchema = z.object({
	name: z.string(),
	id: z.string(),
	level: levelSchema,
	actor: z.string(),
	type: z.array(z.string()),
	stakeholders: z.array(stakeholderSchema),
	description: z.string(),
	relationship: relationshipSchema,
	triggers: z.array(triggerSchema),
	preconditions: z.array(z.string()),
	postconditions: z.array(z.string()),
	['flow-of-events']: z.array(flowOfEventsSchema),
	['alternative-flows']: z.array(alternativeFlowSchema),
	['exception-flows']: z.array(alternativeFlowSchema)
}).transform((usecase) => ({
	...usecase,
	flowOfEvents: usecase['flow-of-events'],
	alternativeFlows: usecase['alternative-flows'],
	exceptionFlows: usecase['exception-flows']
}));
export type UseCaseSchema = z.infer<typeof useCaseSchema>;

export const useCasesListSchema = z.array(useCaseSchema);
export type UseCasesListSchema = z.infer<typeof useCasesListSchema>;