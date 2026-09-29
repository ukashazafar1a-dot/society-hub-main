import { Form, FormSubmission } from "../utils/types";

export const formData: Form[] = [
    {
        id: "f1",
        title: "Resident Feedback Survey 2023",
        description: "General survey about facilities and service satisfaction.",
        status: "Active",
        totalSubmissions: 124,
        newSubmissions: 12,
        createdDate: "Oct 10, 2023",
        lastUpdated: "Oct 10, 2023",
        createdBy: "Admin",
        tags: ["feedback", "survey"],
        fields: [
            {
                id: "fd1",
                label: "Resident Name",
                type: "text",
                required: true,
                visible: true,
                order: 1,
                placeholder: "Enter your full name"
            },
            {
                id: "fd2",
                label: "Overall Rating",
                type: "select",
                options: ["1", "2", "3", "4", "5"],
                required: true,
                visible: true,
                order: 2
            },
            {
                id: "fd3",
                label: "Comments",
                type: "textarea",
                required: false,
                visible: true,
                order: 3,
                placeholder: "Share your thoughts..."
            }
        ]
    },
    {
        id: "f2",
        title: "Gate Pass Request Form",
        description: "Standard form for guest vehicle gate passes.",
        status: "Active",
        totalSubmissions: 450,
        newSubmissions: 35,
        createdDate: "Sep 05, 2023",
        lastUpdated: "Sep 05, 2023",
        createdBy: "Admin",
        tags: ["security", "gate-pass"],
        fields: [
            {
                id: "fd4",
                label: "Vehicle Number",
                type: "text",
                required: true,
                visible: true,
                order: 1,
                placeholder: "ABC-1234"
            },
            {
                id: "fd5",
                label: "Visit Duration",
                type: "select",
                options: ["1 Hour", "4 Hours", "Full Day", "Overnight"],
                required: true,
                visible: true,
                order: 2
            },
            {
                id: "fd6",
                label: "Guest Name",
                type: "text",
                required: true,
                visible: true,
                order: 3,
                placeholder: "Guest name"
            }
        ]
    }
];

export const submissionData: FormSubmission[] = [
    {
        id: "s1",
        formId: "f1",
        data: {
            "Resident Name": "John Doe",
            "Overall Rating": "5",
            Comments: "Great work on the gardens! The landscaping team has done an excellent job this month."
        },
        submittedBy: "Unit A-102",
        submittedAt: "Nov 14, 2023, 10:20 AM",
        isNew: true,
        status: "Pending"
    },
    {
        id: "s2",
        formId: "f1",
        data: {
            "Resident Name": "Jane Smith",
            "Overall Rating": "4",
            Comments: "Pool needs cleaning more often. It was cloudy yesterday and the filter seemed clogged."
        },
        submittedBy: "Unit B-205",
        submittedAt: "Nov 13, 2023, 03:45 PM",
        isNew: false,
        status: "Approved"
    }
];