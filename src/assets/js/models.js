const partymemberModel = {
  name: '',
  birthday: '',
  address: '',
  phone: '',
  email: '',
  gender: '',
  dateJoin: '',
  dateOfficial: '',
  exemption: '',
  _id: '',
  Position: {
    name: '',
    _id: ''
  },
  PartyCell: {
    name: '',
    _id: ''
  },
  Hamlet: {
    name: '',
    _id: '',
    Ward: {
      name: '',
      _id: '',
      District: {
        name: '',
        _id: '',
        Cty_Province: {
          name: '',
          _id: ''
        }
      }
    }
  }
}

const detailedRecommedationModel = {
  exemption: "",
  _id: "",
  createdAt: "",
  updatedAt: "",
  RecommendationId: "",
  Hamlet: {
    name: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    wardId: "",
    Ward: {
      name: "",
      _id: "",
      District: {
        name: "",
        _id: "",
        Cty_Province: {
          name: "",
          _id: ""
        }
      }
    }
  }
}

const recommedationModel = {
  _id: "",
  confirmedAt: "",
  acceptedAt: "",
  createdAt: "",
  updatedAt: "",
  createdBy: "",
  confirmedBy: "",
  acceptedBy: "",
  recommendationStatus: "",
  PartyMember: partymemberModel,
  CreatedBy: {
    name: "",
    _id: ""
  },
  ConfirmedBy: {
    name: "",
    _id: ""
  },
  AcceptedBy: {
    name: "",
    _id: ""
  },
  Detailed_Recommendation: detailedRecommedationModel
}
const recommenwardsModel = {
          _id: "",
          confirmedAt: "",
          acceptedAt: "",
          createdAt: "",
          updatedAt: "",
          createdBy: "",
          confirmedBy: "",
          acceptedBy: "",
          PartyMember: {
              name: "",
              birthday: "",
              address: "",
              phone: "",
              dateJoin: "",
              dateOfficial: "",
              exemption: "",
              _id: "",
              PartyCell: {
                  name: "",
                  _id: ""
              },
              Hamlet: {
                  name: "",
                  _id: "",
                  Ward: {
                      name: "",
                      _id: "",
                      District: {
                          name: "",
                          _id: "",
                          Cty_Province: {
                              name: "",
                              _id: ""
                          }
                      }
                  }
              }
          },
          Detailed_Recommendation: {
              exemption: "",
              _id: "",
              createdAt: "",
              updatedAt: "",
              RecommendationId: "",
              HamletId: "",
              Hamlet: {
                  name: "",
                  _id: "",
                  Ward: {
                      name: "",
                      _id: "",
                      District: {
                          name: "",
                          _id: "",
                          Cty_Province: {
                              name: "",
                              _id: ""
                          }
                      }
                  }
              }
          }
        }

const opinionModel = {
  _id: "",
  createdAt: "",
  SentBy: {
      name: "",
      _id: ""
  },
  Recommendation: {
      _id: "",
      confirmedAt: "",
      acceptedAt: "",
      createdAt: "",
      createdBy: "",
      confirmedBy: "",
      acceptedBy: "",
      PartyMember: {
          name: "",
          birthday: "",
          phone: "",
          gender: "",
          dateJoin: "",
          dateOfficial: "",
          exemption: "",
          _id: "",
          PartyCell: {
              name: "",
              _id: ""
          },
          Position: {
              name: "",
              _id: ""
          },
          Hamlet: {
              name: "",
              _id: "",
              Ward: {
                  name: "",
                  _id: "",
                  District: {
                      name: "",
                      _id: "",
                      Cty_Province: {
                          name: "",
                          _id: ""
                      }
                  }
              }
          }
      },
      CreatedBy: {
          name: "",
          _id: ""
      },
      ConfirmedBy: {
          name: "",
          _id: ""
      },
      AcceptedBy: {
          name: "",
          _id: ""
      },
      Detailed_Recommendation: {
          exemption: "",
          _id: "",
          createdAt: "",
          updatedAt: "",
          RecommendationId: "",
          Hamlet: {
              name: "",
              _id: "",
              createdAt: "",
              updatedAt: "",
              wardId: "",
              Ward: {
                  name: "",
                  _id: "",
                  District: {
                      name: "",
                      _id: "",
                      Cty_Province: {
                          name: "",
                          _id: ""
                      }
                  }
              }
          }
      }
  }
}
const commentModel = {
  name: "",
  exemption: "",
  _id: "",
  priority: "",
  Criterion_Evaluations: [
      {
          "name": "",
          "_id": ""
      },
      {
          "name": "",
          "_id": ""
      },
      {
          "name": "",
          "_id": ""
      }
  ]
}
const AllCommentModel ={
  note: "",
  _id: "",
  createdAt: "",
  CommentedBy: {
    name: "",
    _id: ""
  },
  SignedBy: null,
  Opinion: {
    _id: "",
    createdAt: "",
    Recommendation: {
    _id: "",
    confirmedAt: "",
    acceptedAt: "",
    createdAt: "",
    createdBy: "",
    confirmedBy: "",
    acceptedBy: "",
    PartyMember: {
      name: "",
      birthday: "",
      phone: "",
      gender: "",
      dateJoin: "",
      dateOfficial: "",
      exemption: "",
      _id: "",
      PartyCell: {
        name: "",
        _id: ""
      },
      Position: {
        name: "",
        _id: ""
      },
      Hamlet: {
        name: "",
        _id: "",
      Ward: {
        name: "",
        _id: "",
      District: {
        name: "",
        _id: "",
      Cty_Province: {
        name: "",
        _id: ""
      }
    }
    }
    }
    },
    CreatedBy: {
      name: "",
      _id: ""
    },
      ConfirmedBy: {
        name: "",
        _id: ""
      },
      AcceptedBy: {
        name: "",
        _id: ""
      },
      Detailed_Recommendation: {
        exemption: "",
        _id: "",
        createdAt: "",
        updatedAt: "",
        RecommendationId: "",
        Hamlet: {
          name: "",
          _id: "",
          createdAt: "",
          updatedAt: "",
          wardId: "",
          Ward: {
            name: "",
            _id: "",
            District: {
              name: "",
              _id: "",
              Cty_Province: {
                  name: "",
                  _id: ""
                                    }
                                }
                            }
                        }
                    }
                }
            },
            Criterion_Evaluations: [
              {
                name: "",
                _id: "",
                Criterion: {
                    name: "",
                    _id: ""
                },
                Detailed_Comment: {
                    createdAt: "",
                    updatedAt: "",
                    commentId: "",
                    criterion_evaluationId: ""
                }
            },
            ]
        }

const CommentByIdModel = {
  error: "",
  document: {
    note: "",
    _id: "",
    opinionId: "",
    createdAt: "",
    CommentedBy: {
      name: "",
      _id: ""
    },
    SignedBy: "",
    Criterion_Evaluations: [
      {
        name: "",
        _id: "",
        Criterion: {
        name: "",
        _id: ""
        },
        Detailed_Comment: {
          createdAt: "",
          updatedAt: "",
          commentId: "",
          criterion_evaluationId: ""
        }
      }
    ]
  }
  
}

const OpinionByIdModel = {
  _id: "",
  createdAt: "",
  SentBy: {
    name: "",
    _id: ""
  },
  Recommendation: {
    _id: "",
    confirmedAt: "",
    acceptedAt: "",
    createdAt: "",
    createdBy: "",
    confirmedBy: "",
    acceptedBy: "",
    PartyMember: {
      name: "",
      birthday: "",
      phone: "",
      gender: "",
      dateJoin: "",
      dateOfficial: "",
      exemption: "",
      _id: "",
      PartyCell: {
        name: "",
        _id: ""
      },
      Position: {
        name: "",
        _id: ""
      },
      Hamlet: {
        name: "",
        _id: "",
        Ward: {
          name: "",
          _id: "",
            District: {
              name: "",
              _id: "",
                Cty_Province: {
                  name: "",
                  _id: ""
                }
            }
        }
      }
    },
    CreatedBy: {
      name: "",
      _id: ""
    },
    ConfirmedBy: {
      name: "",
      _id: ""
    },
    AcceptedBy: {
      name: "",
      _id: ""
    },
    Detailed_Recommendation: {
      exemption: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
      RecommendationId: "",
        Hamlet: {
          name: "",
          _id: "",
          createdAt: "",
          updatedAt: "",
          wardId: "",
          Ward: {
            name: "",
            _id: "",
            District: {
              name: "",
              _id: "",
                Cty_Province: {
                  name: "",
                  _id: ""
                }
            }
          }
        }
      }
    }
}

const RecommendationByIdModel = {
  error: "",
  document: {
    _id: "",
    confirmedAt: "",
    acceptedAt: "",
    createdAt: "",
    updatedAt: "",
    partymemberId: "",
    PartyMemberId: "",
    createdBy: "",
    confirmedBy: "",
    acceptedBy: "",
    PartyMember: {
      name: "",
      birthday: "",
      phone: "",
      gender: "",
      dateJoin: "",
      dateOfficial: "",
      exemption: "",
      _id: "",
      PartyCell: {
          name: "",
          _id: ""
      },
      Position: {
          name: "",
          _id: ""
      },
      Hamlet: {
          name: "",
          _id: "",
          Ward: {
              name: "",
              _id: "",
              District: {
                  name: "",
                  _id: "",
                  Cty_Province: {
                      name: "",
                      _id: ""
                  }
              }
          }
      }
  },
    CreatedBy: {
      name: "",
      _id: ""
    },
    ConfirmedBy: {
      name: "",
      _id: ""
    },
    AcceptedBy: {
      name: "",
      _id: ""
    },
      Detailed_Recommendation: {
        exemption: "",
        _id: "",
        createdAt: "",
        updatedAt: "",
          RecommendationId: "",
            HamletId: "",
            Hamlet: {
              name: "",
              _id: "",
              createdAt: "",
              updatedAt: "",
              wardId: "",
                Ward: {
                  name: "",
                  _id: "",
                    District: {
                      name: "",
                      _id: "",
                        Cty_Province: {
                            name: "",
                            _id: ""
                        }
                    }
                }
            }
        }
    },
  recommendationStatus: ""
}


const CommentByYearModel = {
  note: "",
  _id: "",
  createdAt: "",
  CommentedBy: {
    name: "",
    _id: ""
  },
  SignedBy: {
    name: "",
    _id: ""
  },
  Opinion: {
    _id: "",
    createdAt: "",
    Recommendation: {
      _id: "",
      confirmedAt: "",
      acceptedAt: "",
      createdBy: "",
      confirmedBy: "",
      acceptedBy: "",
      PartyMember: {
        name: "",
        birthday: "",
        phone: "",
        gender: "",
        dateJoin: "",
        dateOfficial: "",
        exemption: "",
        _id: "",
        PartyCell: {
          name: "",
          _id: ""
        },
        Position: {
          name: "",
          _id: ""
        },
        Hamlet: {
          name: "",
          _id: "",
          Ward: {
            name: "",
            _id: "",
            District: {
              name: "",
              _id: "",
              Cty_Province: {
                name: "",
                _id: ""
              }
            }
          }
        }
      },
        CreatedBy: {
            name: "",
            _id: ""
        },
        ConfirmedBy: {
          name: "",
          _id: ""
        },
        AcceptedBy: {
          name: "",
          _id: ""
        },
        Detailed_Recommendation: {
          exemption: "",
          _id: "",
          updatedAt: "",
          RecommendationId: "",
          Hamlet: {
              name: "",
              _id: "",
              Ward: {
                name: "",
                _id: "",
                District: {
                  name: "",
                  _id: "",
                  Cty_Province: {
                    name: "",
                    _id: ""
                  }
                }
              }
            }
          }
        }
      },
      Criterion_Evaluations: [
        {
          name: "",
          _id: "",
          Criterion: {
            name: "",
            _id: ""
          },
          Detailed_Comment: {
            createdAt: "",
            updatedAt: "",
            commentId: "",
            criterion_evaluationId: ""
          }
        },
      ]
    }

const CommentOfPartyMember = {
  note: "",
  _id: "",
  createdAt: "",
  CommentedBy: {
    name: "",
    _id: ""
  },
  SignedBy: {
    name: "",
    _id: ""
  },
  Opinion: {
    _id: "",
    createdAt: "",
    Recommendation: {
      _id: "",
      confirmedAt: "",
      acceptedAt: "",
      createdAt: "",
      createdBy: "",
      confirmedBy: "",
      acceptedBy: "",
      PartyMember: {
        name: "",
        birthday: "",
        phone: "",
        gender: "",
        dateJoin: "",
        dateOfficial: "",
        exemption: "",
        _id: "",
        PartyCell: {
          name: "",
          _id: ""
        },
        Position: {
          name: "",
          _id: ""
        },
        Hamlet: {
          name: "",
          _id: "",
          Ward: {
            name: "",
            _id: "",
              District: {
                name: "",
                _id: "",
                  Cty_Province: {
                    name: "",
                    _id: ""
                  }
              }
          }
        }
      },
      "CreatedBy": {
        "name": "",
        "_id": ""
      },
      "ConfirmedBy": {
        "name": "",
        "_id": ""
      },
      "AcceptedBy": {
        "name": "",
        "_id": ""
      },
      "Detailed_Recommendation": {
        "exemption": "",
        "_id": "",
        "createdAt": "",
        "updatedAt": "",
        "RecommendationId": "",
          "Hamlet": {
            "name": "",
            "_id": "",
            "createdAt": "",
            "updatedAt": "",
            "wardId": "",
            "Ward": {
              "name": "",
              "_id": "",
              "District": {
                "name": "",
                "_id": "",
                "Cty_Province": {
                  "name": "",
                  "_id": ""
                }
              }
            }
          }
        }
      }
    },
    "Criterion_Evaluations": [
      {
        "name": "",
        "_id": "",
        "Criterion": {
          "name": "",
          "_id": ""
        },
        "Detailed_Comment": {
          "createdAt": "",
          "updatedAt": "",
          "commentId": "",
          "criterion_evaluationId": ""
        }
      },
    ]
}

const DashRecommementStatus = {
  
    _id: "",
    confirmedAt: "",
    acceptedAt: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    confirmedBy: "",
    acceptedBy: "",
    PartyMember: {
        name: "",
        birthday: "",
        address: "",
        phone: "",
        gender: "",
        dateJoin: "",
        dateOfficial: "",
        code: "",
        exemption: "",
        _id: "",
        PartyCell: {
            name: "",
            "_id": ""
        },
        Hamlet: {
            name: "",
            _id: "",
            Ward: {
                name: "",
                _id: "",
                District: {
                    name: "",
                    _id: "",
                    Cty_Province: {
                        name: "",
                        _id: ""
                    }
                }
            }
        }
    },
    Detailed_Recommendation: {
        exemption: "",
        _id: "",
        createdAt: "",
        updatedAt: "",
      RecommendationId: "",
        HamletId: "",
        Hamlet: {
            name: "",
            _id: "",
            Ward: {
                name: "",
                _id: "",
                District: {
                    name: "",
                    _id: "",
                    Cty_Province: {
                        name: "",
                        _id: ""
                    }
                }
            }
        }
    }

}


const DashYeareValuation = {
  error: "",
  document: [
      {
          note: "",
          _id: "",
          createdAt: "",
          CommentedBy: {
              name: "",
              _id: ""
          },
          SignedBy: {
              name: "",
              _id: ""
          },
          Opinion: {
              _id: "",
              createdAt: "",
              Recommendation: {
                  _id: "",
                  confirmedAt: "",
                  acceptedAt: "",
                  createdBy: "",
                  confirmedBy: "",
                  acceptedBy: "",
                  PartyMember: {
                      name: "",
                      birthday: "",
                      phone: "",
                      gender: "",
                      dateJoin: "",
                      dateOfficial: "",
                      code: "",
                      exemption: "",
                      _id: "",
                      PartyCell: {
                          name: "",
                          _id: ""
                      },
                      Position: {
                          name: "",
                          _id: ""
                      },
                      Hamlet: {
                          name: "",
                          _id: "",
                          Ward: {
                              name: "",
                              _id: "",
                              District: {
                                  name: "",
                                  _id: "",
                                  Cty_Province: {
                                      name: "",
                                      _id: ""
                                  }
                              }
                          }
                      }
                  },
                  CreatedBy: {
                      name: "",
                      _id: ""
                  },
                  ConfirmedBy: {
                      name: "",
                      _id: ""
                  },
                  AcceptedBy: {
                      name: "",
                      _id: ""
                  },
                  Detailed_Recommendation: {
                      exemption: "",
                      _id: "",
                      updatedAt: "",
                      RecommendationId: "",
                      Hamlet: {
                          name: "",
                          _id: "",
                          Ward: {
                              name: "",
                              _id: "",
                              District: {
                                  name: "",
                                  _id: "",
                                  Cty_Province: {
                                    name: "",
                                      _id: ""
                                  }
                              }
                          }
                      }
                  }
              }
          },
          Criterion_Evaluations: [
              {
                  name: "",
                  _id: "",
                  Criterion: {
                      name: "",
                      _id: ""
                  },
                  Detailed_Comment: {
                      createdAt: "",
                      updatedAt: "",
                      commentId: "",
                      criterion_evaluationId: ""
                  }
              },
          ]
      }
  ],
  criterionEvaluationNameCounts: [
    {
        name: "",
        count: "",
    }
]
}

const DashYeareValuationTrue = {
  error: "",
    document: [
        {
            note: "",
            _id: "",
            createdAt: "",
            CommentedBy: {
                name: "",
                _id: ""
            },
            SignedBy: {
                name: "",
                _id: ""
            },
            Opinion: {
                _id: "",
                createdAt: "",
                Recommendation: {
                    _id: "",
                    confirmedAt: "",
                    acceptedAt: "",
                    createdBy: "",
                    confirmedBy: "",
                    acceptedBy: "",
                    PartyMember: {
                        name: "",
                        birthday: "",
                        phone: "",
                        gender: "",
                        dateJoin: "",
                        dateOfficial: "",
                        code: "",
                        exemption: "",
                        _id: "",
                        PartyCell: {
                            name: "",
                            _id: ""
                        },
                        Position: {
                            name: "",
                            _id: ""
                        },
                        Hamlet: {
                            name: "",
                            _id: "",
                            Ward: {
                                name: "",
                                _id: "",
                                District: {
                                    name: "",
                                    _id: "",
                                    Cty_Province: {
                                        name: "",
                                        _id: ""
                                    }
                                }
                            }
                        }
                    },
                    CreatedBy: {
                        name: "",
                        _id: ""
                    },
                    ConfirmedBy: {
                        name: "",
                        _id: ""
                    },
                    AcceptedBy: {
                        name: "",
                        _id: ""
                    },
                    Detailed_Recommendation: {
                        exemption: "",
                        _id: "",
                        updatedAt: "",
                        RecommendationId: "",
                        Hamlet: {
                            name: "",
                            _id: "",
                            Ward: {
                                name: "",
                                _id: "",
                                District: {
                                    name: "",
                                    _id: "",
                                    Cty_Province: {
                                        name: "",
                                        _id: ""
                                    }
                                }
                            }
                        }
                    }
                }
            },
            Criterion_Evaluations: [
                {
                    name: "",
                    _id: "",
                    Criterion: {
                        name: "",
                        _id: ""
                    },
                    Detailed_Comment: {
                        createdAt: "",
                        updatedAt: "",
                        commentId: "",
                        criterion_evaluationId: ""
                    }
                },
                
                
            ]
        }
    ],
    criterionEvaluationCountsByCriterion: [
        {
            criterionId: "",
            criterionName: "",
            criterionEvaluationCounts: [
                {
                    name: "",
                    count: ""
                }
            ]
        },
    ]
}


export {
  partymemberModel,
  recommedationModel,
  detailedRecommedationModel,
  recommenwardsModel,
  opinionModel,
  commentModel,
  AllCommentModel,
  CommentByIdModel,
  OpinionByIdModel,
  RecommendationByIdModel,
  CommentByYearModel,
  CommentOfPartyMember,
  DashRecommementStatus,
  DashYeareValuation,
  DashYeareValuationTrue
}
