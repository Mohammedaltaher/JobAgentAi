import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Upload, User, FileText, Edit } from "lucide-react"
import { CollapsibleSection } from "@/components/ui/collapsible-section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

type ProfileData = {
  profilePicture: File | null
  personalInfo: {
    name: string
    title: string
    location: string
    email: string
    phone: string
    nationality: string
  }
  profile: string
  skills: {
    categories: {
      name: string
      skills: string[]
    }[]
  }
  professionalExperiences: {
    role: string
    company: string
    duration: string
    location: string
    tools: string
    description: string
    achievements: string[]
    projects: {
      name: string
      description: string
    }[]
  }[]
  education: {
    degree: string
    institution: string
    location: string
    year: string
  }[]
  languages: string[]
  agentNotes: {
    summaryOfChanges: string[]
    interviewFocusTips: string[]
  }
}

export default function Profile() {
  const [showAddSkillForm, setShowAddSkillForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  
  const { register, handleSubmit, setValue, watch } = useForm<ProfileData>({
    defaultValues: {
      profilePicture: null,
      personalInfo: {
        name: "",
        title: "",
        location: "",
        email: "",
        phone: "",
        nationality: ""
      },
      profile: "",
      skills: {
        categories: [{ name: "", skills: [""] }]
      },
      professionalExperiences: [{
        role: "",
        company: "",
        duration: "",
        location: "",
        tools: "",
        description: "",
        achievements: [""],
        projects: [{ name: "", description: "" }]
      }],
      education: [{
        degree: "",
        institution: "",
        location: "",
        year: ""
      }],
      languages: [""],
      agentNotes: {
        summaryOfChanges: [""],
        interviewFocusTips: [""]
      }
    }
  })

  const onSubmit = (data: ProfileData) => {
    console.log(data)
    // Handle form submission
  }

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue("profilePicture", file)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Process the file (parse CV, extract data, etc.)
      console.log("File uploaded:", file.name)
      // You would typically call an API here to process the CV
    }
  }

  const currentCategorySkills = editingCategory !== null 
    ? watch(`skills.categories.${editingCategory}.skills`) 
    : [""]

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button className="bg-[#21CE99] hover:bg-[#1db989]">
          Save Profile
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CollapsibleSection title="Profile Documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Picture */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  {watch("profilePicture") ? (
                    <img
                      src={URL.createObjectURL(watch("profilePicture")!)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Profile Picture</h3>
                  <Label
                    htmlFor="profile-picture"
                    className="flex items-center justify-center w-full h-10 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Upload Photo</span>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureUpload}
                    />
                  </Label>
                  <p className="mt-1 text-xs text-gray-500">
                    Square image, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Resume/CV</h3>
                  <Label
                    htmlFor="cv-upload"
                    className="flex items-center justify-center w-full h-10 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Upload CV</span>
                    <Input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </Label>
                  <p className="mt-1 text-xs text-gray-500">
                    PDF, DOC, DOCX, max 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("personalInfo.name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" {...register("personalInfo.title")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("personalInfo.location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("personalInfo.email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("personalInfo.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input id="nationality" {...register("personalInfo.nationality")} />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Professional Profile">
          <div className="space-y-2">
            <Label htmlFor="profile">Summary</Label>
            <Textarea
              id="profile"
              rows={5}
              {...register("profile")}
              placeholder="Write a brief summary about your professional background..."
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Skills">
          <div className="space-y-4">
            {!showAddSkillForm ? (
              <>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null)
                      setShowAddSkillForm(true)
                    }}
                    className="bg-[#21CE99] hover:bg-[#1db989]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Category
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watch("skills.categories")?.map((category, catIndex) => (
                        <TableRow key={catIndex}>
                          <TableCell className="font-medium">{category.name || "Unnamed Category"}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {category.skills?.filter(Boolean).map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingCategory(catIndex)
                                  setShowAddSkillForm(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newCategories = [...watch("skills.categories")]
                                  newCategories.splice(catIndex, 1)
                                  setValue("skills.categories", newCategories)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <div className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    {editingCategory !== null ? "Edit Category" : "Add New Category"}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddSkillForm(false)
                      setEditingCategory(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      {...register(
                        `skills.categories.${editingCategory ?? watch("skills.categories").length}.name`
                      )}
                      placeholder="e.g., Programming Languages"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    {currentCategorySkills.map((_, skillIndex) => (
                      <div key={skillIndex} className="flex gap-2 items-center">
                        <Input
                          {...register(
                            `skills.categories.${editingCategory ?? watch("skills.categories").length}.skills.${skillIndex}`
                          )}
                          placeholder="e.g., JavaScript"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newSkills = [...currentCategorySkills]
                            newSkills.splice(skillIndex, 1)
                            setValue(
                              `skills.categories.${editingCategory ?? watch("skills.categories").length}.skills`,
                              newSkills
                            )
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setValue(
                          `skills.categories.${editingCategory ?? watch("skills.categories").length}.skills`,
                          [...currentCategorySkills, ""]
                        )
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddSkillForm(false)
                        setEditingCategory(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="bg-[#21CE99] hover:bg-[#1db989]"
                      onClick={() => {
                        if (editingCategory === null) {
                          setValue("skills.categories", [
                            ...watch("skills.categories"),
                            { name: "", skills: [""] }
                          ])
                        }
                        setShowAddSkillForm(false)
                        setEditingCategory(null)
                      }}
                    >
                      {editingCategory !== null ? "Save Changes" : "Add Category"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Professional Experience">
          <div className="space-y-6">
            {watch("professionalExperiences").map((exp, expIndex) => (
              <div key={expIndex} className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Experience #{expIndex + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newExps = [...watch("professionalExperiences")]
                      newExps.splice(expIndex, 1)
                      setValue("professionalExperiences", newExps)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-role-${expIndex}`}>Role</Label>
                    <Input
                      id={`exp-role-${expIndex}`}
                      {...register(`professionalExperiences.${expIndex}.role`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-company-${expIndex}`}>Company</Label>
                    <Input
                      id={`exp-company-${expIndex}`}
                      {...register(`professionalExperiences.${expIndex}.company`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-duration-${expIndex}`}>Duration</Label>
                    <Input
                      id={`exp-duration-${expIndex}`}
                      {...register(`professionalExperiences.${expIndex}.duration`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-location-${expIndex}`}>Location</Label>
                    <Input
                      id={`exp-location-${expIndex}`}
                      {...register(`professionalExperiences.${expIndex}.location`)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`exp-tools-${expIndex}`}>Tools/Technologies</Label>
                  <Input
                    id={`exp-tools-${expIndex}`}
                    {...register(`professionalExperiences.${expIndex}.tools`)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`exp-description-${expIndex}`}>Description</Label>
                  <Textarea
                    id={`exp-description-${expIndex}`}
                    rows={3}
                    {...register(`professionalExperiences.${expIndex}.description`)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Achievements</Label>
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex gap-2 items-center">
                      <Input
                        {...register(`professionalExperiences.${expIndex}.achievements.${achIndex}`)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newAchievements = [...exp.achievements]
                          newAchievements.splice(achIndex, 1)
                          setValue(`professionalExperiences.${expIndex}.achievements`, newAchievements)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setValue(`professionalExperiences.${expIndex}.achievements`, [
                        ...exp.achievements,
                        ""
                      ])
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Projects</Label>
                  {exp.projects.map((project, projIndex) => (
                    <div key={projIndex} className="space-y-2 border p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Project #{projIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newProjects = [...exp.projects]
                            newProjects.splice(projIndex, 1)
                            setValue(`professionalExperiences.${expIndex}.projects`, newProjects)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-project-name-${expIndex}-${projIndex}`}>Name</Label>
                        <Input
                          id={`exp-project-name-${expIndex}-${projIndex}`}
                          {...register(`professionalExperiences.${expIndex}.projects.${projIndex}.name`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-project-desc-${expIndex}-${projIndex}`}>Description</Label>
                        <Textarea
                          id={`exp-project-desc-${expIndex}-${projIndex}`}
                          rows={2}
                          {...register(`professionalExperiences.${expIndex}.projects.${projIndex}.description`)}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setValue(`professionalExperiences.${expIndex}.projects`, [
                        ...exp.projects,
                        { name: "", description: "" }
                      ])
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Education">
          <div className="space-y-4">
            {watch("education").map((edu, eduIndex) => (
              <div key={eduIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-lg">
                <div className="flex justify-between items-start col-span-4">
                  <h3 className="font-medium">Education #{eduIndex + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newEdu = [...watch("education")]
                      newEdu.splice(eduIndex, 1)
                      setValue("education", newEdu)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-degree-${eduIndex}`}>Degree</Label>
                  <Input
                    id={`edu-degree-${eduIndex}`}
                    {...register(`education.${eduIndex}.degree`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-institution-${eduIndex}`}>Institution</Label>
                  <Input
                    id={`edu-institution-${eduIndex}`}
                    {...register(`education.${eduIndex}.institution`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-location-${eduIndex}`}>Location</Label>
                  <Input
                    id={`edu-location-${eduIndex}`}
                    {...register(`education.${eduIndex}.location`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-year-${eduIndex}`}>Year</Label>
                  <Input
                    id={`edu-year-${eduIndex}`}
                    {...register(`education.${eduIndex}.year`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Languages">
          <div className="space-y-2">
            {watch("languages").map((language, langIndex) => (
              <div key={langIndex} className="flex gap-2 items-center">
                <Input
                  {...register(`languages.${langIndex}`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newLangs = [...watch("languages")]
                    newLangs.splice(langIndex, 1)
                    setValue("languages", newLangs)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Agent Notes">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Summary of Changes</Label>
              <div className="space-y-1">
                {watch("agentNotes.summaryOfChanges").map((note, noteIndex) => (
                  <p key={noteIndex} className="text-sm text-gray-700">
                    • {note}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Interview Focus Tips</Label>
              <div className="space-y-1">
                {watch("agentNotes.interviewFocusTips").map((tip, tipIndex) => (
                  <p key={tipIndex} className="text-sm text-gray-700">
                    • {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#21CE99] hover:bg-[#1db989]">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  )
}